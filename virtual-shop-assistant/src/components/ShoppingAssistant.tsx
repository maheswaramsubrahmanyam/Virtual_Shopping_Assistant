import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { type Product, products, searchProducts } from '@/data/products';
import { generateResponse } from '@/utils/assistant';
import { startSpeechRecognition, speak, initVoices } from '@/utils/speech';
import { ProductGrid } from '@/components/ProductGrid';
import { toast } from 'sonner';
import Image from 'next/image';

type Message = {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  products?: Product[];
  isSystemMessage?: boolean;
};

type CheckoutState = {
  stage: 'initial' | 'address' | 'payment' | 'confirmation' | 'complete';
  address?: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
  paymentMethod?: 'credit-card' | 'cash-on-delivery' | 'paypal';
  orderId?: string;
  deliveryDate?: string;
  specificProduct?: Product; // For direct checkout of a specific product
};

export function ShoppingAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checkout, setCheckout] = useState<CheckoutState>({ stage: 'initial' });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add initial greeting
  useEffect(() => {
    const initialResponse = generateResponse('hello');
    setMessages([{
      id: Date.now().toString(),
      sender: 'assistant',
      text: initialResponse.text,
    }]);

    // Initialize voices
    initVoices();
  }, []);

  // Scroll to bottom of messages
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Find product by name (case insensitive partial match)
  const findProductByName = (name: string): Product | undefined => {
    const lowerName = name.toLowerCase().trim();
    return products.find(
      (product) => product.name.toLowerCase().includes(lowerName) ||
                   lowerName.includes(product.name.toLowerCase())
    );
  };

  // Process checkout steps
  const handleCheckoutProcess = (userMessage?: string) => {
    // Special case for specific product checkout
    const currentCart = checkout.specificProduct ? [checkout.specificProduct] : cart;

    if (currentCart.length === 0) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'assistant',
          text: 'Your cart is empty. Please add products before checkout.',
        }
      ]);
      setCheckout({ stage: 'initial' });
      return;
    }

    switch (checkout.stage) {
      case 'initial': {
        // Start checkout process
        setCheckout(prev => ({ ...prev, stage: 'address' }));
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'assistant',
            text: 'To proceed with your order, please provide your delivery address in the format: Name, Street Address, City, State, ZIP, Phone Number',
          }
        ]);
        speak('To proceed with your order, please provide your delivery address');
        break;
      }

      case 'address': {
        if (!userMessage) return;

        // Process the address
        const addressParts = userMessage.split(',').map(part => part.trim());
        if (addressParts.length < 4) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              sender: 'assistant',
              text: 'Please provide your complete address with name, street, city, state, ZIP code, and phone number separated by commas.',
            }
          ]);
          speak('Please provide your complete address');
          return;
        }

        const [name, street, city, state, zip = '', phone = ''] = addressParts;

        const address = { name, street, city, state, zip, phone };
        setCheckout(prev => ({ ...prev, stage: 'payment', address }));

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'assistant',
            text: `Thank you! Your delivery address has been set to:\n\n${name}\n${street}\n${city}, ${state} ${zip}\nPhone: ${phone}\n\nPlease select your payment method: Credit Card, PayPal, or Cash on Delivery`,
          }
        ]);
        speak('Thank you! Please select your payment method: Credit Card, PayPal, or Cash on Delivery');
        break;
      }

      case 'payment': {
        if (!userMessage) return;

        const lowerMessage = userMessage.toLowerCase();
        let paymentMethod: 'credit-card' | 'cash-on-delivery' | 'paypal';

        if (lowerMessage.includes('credit') || lowerMessage.includes('card')) {
          paymentMethod = 'credit-card';
        } else if (lowerMessage.includes('cash') || lowerMessage.includes('delivery') || lowerMessage.includes('cod')) {
          paymentMethod = 'cash-on-delivery';
        } else if (lowerMessage.includes('paypal') || lowerMessage.includes('pay pal')) {
          paymentMethod = 'paypal';
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              sender: 'assistant',
              text: 'Please select a valid payment method: Credit Card, PayPal, or Cash on Delivery',
            }
          ]);
          speak('Please select a valid payment method');
          return;
        }

        setCheckout(prev => ({ ...prev, stage: 'confirmation', paymentMethod }));

        // Format items for display
        const itemsText = currentCart.map(item => `- ${item.name}: $${item.price.toFixed(2)}`).join('\n');
        const totalPrice = currentCart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

        // Payment method text
        const paymentMethodText =
          paymentMethod === 'credit-card' ? 'Credit Card' :
          paymentMethod === 'paypal' ? 'PayPal' :
          'Cash on Delivery';

        const confirmationText = `Please confirm your order:\n\n${currentCart.length} item${currentCart.length > 1 ? 's' : ''} in your cart:\n${itemsText}\n\nTotal: $${totalPrice}\n\nDelivery Address:\n${checkout.address?.name}\n${checkout.address?.street}\n${checkout.address?.city}, ${checkout.address?.state} ${checkout.address?.zip}\nPhone: ${checkout.address?.phone}\n\nPayment Method: ${paymentMethodText}\n\nType "confirm" to place your order, or "edit" to make changes.`;

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'assistant',
            text: confirmationText,
          }
        ]);
        speak('Please confirm your order by typing confirm, or edit to make changes');
        break;
      }

      case 'confirmation': {
        if (!userMessage) return;

        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('edit') || lowerMessage.includes('change') || lowerMessage.includes('modify')) {
          setCheckout(prev => ({ ...prev, stage: 'address' }));
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              sender: 'assistant',
              text: 'Let\'s start over. Please provide your delivery address.',
            }
          ]);
          speak('Let\'s start over. Please provide your delivery address');
          return;
        }

        if (!lowerMessage.includes('confirm') && !lowerMessage.includes('yes') && !lowerMessage.includes('ok')) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              sender: 'assistant',
              text: 'Please type "confirm" to place your order, or "edit" to make changes.',
            }
          ]);
          speak('Please confirm your order');
          return;
        }

        // Generate order ID and delivery date
        const orderId = `ORD-${Math.floor(Math.random() * 10000)}-${Date.now().toString().slice(-4)}`;
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);
        const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        setCheckout(prev => ({
          ...prev,
          stage: 'complete',
          orderId,
          deliveryDate: formattedDeliveryDate
        }));

        // Construct detailed order confirmation with products display
        const productsToDisplay = checkout.specificProduct ? [checkout.specificProduct] : cart;
        const productsDisplay = productsToDisplay.map((product) => ({
          ...product,
          displayText: `- ${product.name} (ID: ${product.id}): $${product.price.toFixed(2)}\n  ${product.description}`
        }));

        const itemsText = productsDisplay.map(product => product.displayText).join('\n\n');
        const totalPrice = productsToDisplay.reduce((sum, item) => sum + item.price, 0).toFixed(2);

        const paymentMethodText =
          checkout.paymentMethod === 'credit-card' ? 'Credit Card' :
          checkout.paymentMethod === 'paypal' ? 'PayPal' :
          'Cash on Delivery';

        const orderConfirmation = `🎉 Your order has been successfully placed! 🎉\n\nOrder ID: ${orderId}\n\nOrder Details:\n${itemsText}\n\nTotal: $${totalPrice}\n\nDelivery Address:\n${checkout.address?.name}\n${checkout.address?.street}\n${checkout.address?.city}, ${checkout.address?.state} ${checkout.address?.zip}\nPhone: ${checkout.address?.phone}\n\nPayment Method: ${paymentMethodText}\n\nExpected Delivery: ${formattedDeliveryDate}\n\nThank you for shopping with us!`;

        // Add order confirmation message with product images
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'assistant',
            text: orderConfirmation,
            products: productsToDisplay,
            isSystemMessage: true,
          }
        ]);
        speak('Your order has been successfully placed! Thank you for shopping with us!');

        // Clear the cart if we used cart items (not for specific product)
        if (!checkout.specificProduct) {
          setCart([]);
        }

        // Reset checkout after a delay to allow the user to see the confirmation
        setTimeout(() => {
          setCheckout({ stage: 'initial' });
        }, 5000);

        break;
      }

      default:
        // Reset checkout if in an unknown state
        setCheckout({ stage: 'initial' });
    }
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    // Generate a unique ID for the message with a timestamp
    const messageId = Date.now().toString();

    // Create user message
    const userMessage: Message = {
      id: messageId,
      sender: 'user',
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const userInput = input;
    setInput('');
    setIsLoading(true);

    // Check if we're in checkout flow
    if (checkout.stage !== 'initial' && checkout.stage !== 'complete') {
      handleCheckoutProcess(userMessage.text);
      setIsLoading(false);
      return;
    }

    // Check for add to cart intent
    const addToCartRegex = /add\s+(.*?)\s+to\s+(?:my\s+)?cart/i;
    const addMatch = userInput.match(addToCartRegex);

    if (addMatch?.[1]) {
      const productName = addMatch[1].trim();
      const product = findProductByName(productName);

      if (product) {
        handleAddToCart(product, true);
        setIsLoading(false);
        return;
      }
    }

    // Check for checkout specific product intent
    const checkoutProductRegex = /checkout\s+(.*?)(?:\s+now)?$/i;
    const checkoutMatch = userInput.match(checkoutProductRegex);

    if (checkoutMatch?.[1]) {
      const productName = checkoutMatch[1].trim();
      const product = findProductByName(productName);

      if (product) {
        // Set the specific product for checkout
        setCheckout({
          stage: 'initial',
          specificProduct: product
        });

        // Add a message showing the product to be checked out
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: `I'll check out the ${product.name} for you. Here's the product:`,
            products: [product],
          }
        ]);

        // Start the checkout process
        setTimeout(() => {
          handleCheckoutProcess();
        }, 1000);

        setIsLoading(false);
        return;
      }
    }

    // Check for checkout command
    if (userInput.toLowerCase().includes('checkout') && !userInput.toLowerCase().match(/checkout\s+.+/)) {
      handleCheckoutProcess();
      setIsLoading(false);
      return;
    }

    // Regular message flow
    // Wait for a short period to simulate processing
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Generate assistant response
    const response = generateResponse(userMessage.text, cart);

    // Create assistant message with a unique ID
    const assistantMessageId = (Date.now() + 100).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      sender: 'assistant',
      text: response.text,
      products: response.products,
    };

    setMessages((prev) => [...prev, assistantMessage]);

    // Speak the response
    speak(response.text);

    setIsLoading(false);
  };

  // Handle adding product to cart
  const handleAddToCart = (product: Product, isVoiceCommand = false) => {
    setCart((prev) => [...prev, product]);

    toast.success(`Added ${product.name} to cart`);

    if (isVoiceCommand) {
      // If it's a voice command, add a confirmation message to the chat
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'assistant',
          text: `I've added the ${product.name} to your cart.`,
          products: [product],
        }
      ]);
      speak(`I've added the ${product.name} to your cart.`);
    } else {
      // Otherwise, just update with cart state
      const cartResponse = generateResponse('cart', [...cart, product]);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'assistant',
          text: cartResponse.text,
          products: cartResponse.products,
        }
      ]);
    }
  };

  // Handle voice recognition
  const startListening = () => {
    setIsListening(true);

    const stopListening = startSpeechRecognition(
      // On result
      (transcript) => {
        setInput(transcript);

        // Submit the form after getting the transcript
        setTimeout(() => {
          setInput(transcript);
          handleSendMessage();
        }, 500);
      },
      // On end
      () => {
        setIsListening(false);
      },
      // On error
      (error) => {
        console.error('Speech recognition error:', error);
        toast.error('Error recognizing speech. Please try again.');
        setIsListening(false);
      }
    );

    // Return the cleanup function
    return () => {
      stopListening();
    };
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages */}
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : message.isSystemMessage
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>

                {/* Display products if available */}
                {message.products && message.products.length > 0 && (
                  <div className="mt-4">
                    <ProductGrid products={message.products} onAddToCart={handleAddToCart} />
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={checkout.stage !== 'initial' ?
              (checkout.stage === 'address' ? 'Enter your delivery address...' :
               checkout.stage === 'payment' ? 'Enter payment method...' :
               checkout.stage === 'confirmation' ? 'Type "confirm" to place order...' :
               'Type your message...') :
              'Type your message...'}
            className="flex-grow"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={isLoading || isListening}
          />
          <Button
            onClick={handleSendMessage}
            disabled={input.trim() === '' || isLoading || isListening}
          >
            Send
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={startListening}
            disabled={isLoading || isListening}
            className={isListening ? 'bg-red-100' : ''}
          >
            <MicrophoneIcon className="w-4 h-4" />
          </Button>
        </div>

        {isListening && (
          <div className="mt-2 text-sm text-center text-gray-500">
            Listening... Speak now
          </div>
        )}

        {/* Cart summary */}
        {cart.length > 0 && checkout.stage === 'initial' && (
          <div className="flex items-center justify-between mt-4 p-2 bg-gray-100 rounded">
            <span>
              Cart: {cart.length} item{cart.length > 1 ? 's' : ''} (${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)})
            </span>
            <Button variant="outline" size="sm" onClick={() => handleCheckoutProcess()}>
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function MicrophoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}
