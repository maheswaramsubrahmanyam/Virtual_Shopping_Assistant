import { type Product, searchProducts, categories, getProductsByCategory, getProductById } from '@/data/products';

type SearchData = {
  query: string;
};

type CategoryData = {
  categoryId: string;
};

type AssistantResponseData = SearchData | CategoryData;

type AssistantResponse = {
  text: string;
  products?: Product[];
  action?: 'search' | 'category' | 'product' | 'cart' | 'checkout' | 'unknown';
  data?: AssistantResponseData;
};

// Helper function to generate greeting messages
const getGreeting = (): string => {
  const greetings = [
    'Hello! How can I help you with your shopping today?',
    'Hi there! I\'m your virtual shopping assistant. What can I help you find?',
    'Welcome! I\'m here to assist with your shopping. What are you looking for?',
    'Greetings! How may I assist you with your shopping experience today?'
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
};

// Check if a string contains any category term
const containsCategoryTerm = (input: string): {contains: boolean, categoryId?: string} => {
  const lowerInput = input.toLowerCase();

  // Check for exact category matches
  const exactMatch = categories.find(category =>
    lowerInput.includes(category.name.toLowerCase()) ||
    lowerInput.includes(category.id.toLowerCase())
  );

  if (exactMatch) {
    return { contains: true, categoryId: exactMatch.id };
  }

  // Check for partial category matches
  if (lowerInput.includes('electronic') || lowerInput.includes('tech')) {
    return { contains: true, categoryId: 'electronics' };
  }

  if (lowerInput.includes('cloth') || lowerInput.includes('fashion') || lowerInput.includes('wear')) {
    return { contains: true, categoryId: 'clothing' };
  }

  if (lowerInput.includes('home') || lowerInput.includes('garden') || lowerInput.includes('house')) {
    return { contains: true, categoryId: 'home-garden' };
  }

  if (lowerInput.includes('beauty') || lowerInput.includes('cosmetic') || lowerInput.includes('makeup')) {
    return { contains: true, categoryId: 'beauty' };
  }

  if (lowerInput.includes('sport') || lowerInput.includes('outdoor') || lowerInput.includes('fitness')) {
    return { contains: true, categoryId: 'sports' };
  }

  if (lowerInput.includes('book') || lowerInput.includes('read') || lowerInput.includes('novel')) {
    return { contains: true, categoryId: 'books' };
  }

  if (lowerInput.includes('toy') || lowerInput.includes('game') || lowerInput.includes('play')) {
    return { contains: true, categoryId: 'toys' };
  }

  if (lowerInput.includes('food') || lowerInput.includes('drink') || lowerInput.includes('beverage')) {
    return { contains: true, categoryId: 'food' };
  }

  return { contains: false };
};

// Helper function to extract intent from user input
const extractIntent = (input: string): {
  intent: 'greeting' | 'search' | 'category' | 'product' | 'cart' | 'checkout' | 'help' | 'unknown';
  query?: string;
  categoryId?: string;
  productId?: string;
} => {
  const lowerInput = input.toLowerCase().trim();

  // Check for greetings
  if (/^(hi|hello|hey|greetings)/.test(lowerInput)) {
    return { intent: 'greeting' };
  }

  // Check for help requests
  if (/^(help|assist|support|what can you do)/.test(lowerInput)) {
    return { intent: 'help' };
  }

  // Check for category browsing
  const categoryCheck = containsCategoryTerm(lowerInput);
  const hasCategoryIndicator = /^(show|browse|view|display|list|show me|check out|see|look at)\s+/i.test(lowerInput);

  if (categoryCheck.contains && hasCategoryIndicator) {
    return { intent: 'category', categoryId: categoryCheck.categoryId };
  }

  // Check for search requests
  if (/^(find|search|looking for|show me|do you have|i want|i need|i'm looking for|i am looking for)/.test(lowerInput)) {
    const query = lowerInput.replace(/^(find|search|looking for|show me|do you have|i want|i need|i'm looking for|i am looking for)\s+/, '');

    // Check if the search query itself has a clear category intent
    const queryCategory = containsCategoryTerm(query);
    if (queryCategory.contains) {
      return { intent: 'category', categoryId: queryCategory.categoryId };
    }

    return { intent: 'search', query };
  }

  // Check for category browsing (higher precedence than general category terms)
  if (categoryCheck.contains) {
    return { intent: 'category', categoryId: categoryCheck.categoryId };
  }

  // Check for cart actions
  if (/^(cart|basket|my items|view cart|show cart)/.test(lowerInput)) {
    return { intent: 'cart' };
  }

  // Check for checkout
  if (/^(checkout|pay|purchase|buy|order)/.test(lowerInput)) {
    return { intent: 'checkout' };
  }

  // Default to search for anything else
  return { intent: 'search', query: lowerInput };
};

// Main function to generate assistant responses
export const generateResponse = (userInput: string, cartItems: Product[] = []): AssistantResponse => {
  const { intent, query, categoryId, productId } = extractIntent(userInput);

  switch (intent) {
    case 'greeting': {
      return {
        text: getGreeting()
      };
    }

    case 'help': {
      return {
        text: `I can help you with:
- Finding products (try "Find headphones")
- Browsing categories (try "Show me electronics")
- Managing your cart (try "View my cart")
- Checking out (try "Checkout")
What would you like to do?`
      };
    }

    case 'search': {
      if (!query) {
        return {
          text: 'What would you like to search for?'
        };
      }

      const results = searchProducts(query);

      if (results.length === 0) {
        return {
          text: `I couldn't find any products matching "${query}". Would you like to try a different search term?`,
          products: [],
          action: 'search',
          data: { query }
        };
      }

      return {
        text: `I found ${results.length} product${results.length > 1 ? 's' : ''} matching "${query}":`,
        products: results,
        action: 'search',
        data: { query }
      };
    }

    case 'category': {
      if (!categoryId) {
        return {
          text: 'Which category would you like to browse?',
          action: 'category'
        };
      }

      const categoryProducts = getProductsByCategory(categoryId);
      const category = categories.find(cat => cat.id === categoryId);

      if (categoryProducts.length === 0) {
        return {
          text: `I couldn't find any products in the ${category?.name || categoryId} category.`,
          action: 'category',
          data: { categoryId }
        };
      }

      return {
        text: `Here are products in the ${category?.name || categoryId} category:`,
        products: categoryProducts,
        action: 'category',
        data: { categoryId }
      };
    }

    case 'cart': {
      if (cartItems.length === 0) {
        return {
          text: 'Your shopping cart is empty. Would you like to browse our products?',
          action: 'cart'
        };
      }

      const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

      return {
        text: `Your shopping cart has ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} with a total of $${total}.`,
        products: cartItems,
        action: 'cart'
      };
    }

    case 'checkout': {
      if (cartItems.length === 0) {
        return {
          text: 'Your shopping cart is empty. Add some items before checkout.',
          action: 'checkout'
        };
      }

      return {
        text: 'Ready to check out? Let\'s proceed with your order.',
        action: 'checkout'
      };
    }

    default: {
      // Attempt to find products matching the input as a fallback
      const fallbackResults = searchProducts(userInput);

      if (fallbackResults.length > 0) {
        return {
          text: `Here are some products that might match what you're looking for:`,
          products: fallbackResults,
          action: 'search',
          data: { query: userInput }
        };
      }

      return {
        text: "I'm not sure I understood that. Can you try rephrasing or ask for help?",
        action: 'unknown'
      };
    }
  }
};
