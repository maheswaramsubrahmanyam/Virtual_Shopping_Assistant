export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  tags: string[];
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest gadgets and electronic devices",
  },
  {
    id: "clothing",
    name: "Clothing",
    description: "Fashion items for all seasons",
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    description: "Products for your home and garden",
  },
  {
    id: "beauty",
    name: "Beauty",
    description: "Cosmetics and beauty products",
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    description: "Equipment and apparel for sports and outdoor activities",
  },
  {
    id: "books",
    name: "Books",
    description: "Fiction, non-fiction, and educational books",
  },
  {
    id: "toys",
    name: "Toys & Games",
    description: "Toys and games for all ages",
  },
  {
    id: "food",
    name: "Food & Beverages",
    description: "Delicious food and drink items",
  },
];

export const products: Product[] = [
  // Electronics
  {
    id: "p1",
    name: "Wireless Headphones",
    description: "Premium noise-canceling wireless headphones with 20-hour battery life",
    price: 149.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["headphones", "wireless", "audio", "electronics"],
  },
  {
    id: "p2",
    name: "Smart Watch",
    description: "Water-resistant smartwatch with health tracking and notification features",
    price: 199.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["smartwatch", "watch", "wearable", "electronics"],
  },
  {
    id: "p3",
    name: "4K Smart TV",
    description: "55-inch 4K Smart TV with HDR and built-in streaming apps",
    price: 499.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=400&auto=format&fit=crop",
    inStock: false,
    tags: ["tv", "television", "smart tv", "electronics"],
  },
  {
    id: "p28",
    name: "Bluetooth Speaker",
    description: "Portable waterproof Bluetooth speaker with 360° sound and 12-hour battery life",
    price: 79.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["speaker", "bluetooth", "audio", "portable", "electronics"],
  },
  {
    id: "p29",
    name: "Digital Camera",
    description: "24.2MP digital camera with 4K video recording and interchangeable lenses",
    price: 649.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["camera", "digital", "photography", "electronics"],
  },
  {
    id: "p30",
    name: "Gaming Console",
    description: "Next-gen gaming console with 1TB storage, 4K gaming, and streaming capabilities",
    price: 499.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=400&auto=format&fit=crop",
    inStock: false,
    tags: ["gaming", "console", "video games", "electronics"],
  },
  {
    id: "p31",
    name: "Wireless Earbuds",
    description: "True wireless earbuds with noise isolation and touch controls",
    price: 89.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["earbuds", "wireless", "audio", "electronics"],
  },
  {
    id: "p32",
    name: "Laptop",
    description: "Ultra-thin laptop with 16GB RAM, 512GB SSD, and dedicated graphics",
    price: 1299.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["laptop", "computer", "notebook", "electronics"],
  },
  {
    id: "p33",
    name: "Tablet",
    description: "10.2-inch tablet with 64GB storage, Wi-Fi, and all-day battery life",
    price: 329.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["tablet", "ipad", "portable", "electronics"],
  },

  // Clothing
  {
    id: "p4",
    name: "Men's Casual Shirt",
    description: "100% cotton casual shirt for men, available in multiple colors",
    price: 39.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["shirt", "men", "casual", "clothing"],
  },
  {
    id: "p5",
    name: "Women's Summer Dress",
    description: "Lightweight summer dress with floral pattern",
    price: 59.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1623119319146-a3d9348da3d7?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["dress", "women", "summer", "clothing"],
  },
  {
    id: "p34",
    name: "Winter Jacket",
    description: "Water-resistant insulated jacket for cold weather protection",
    price: 129.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["jacket", "winter", "outerwear", "clothing"],
  },
  {
    id: "p35",
    name: "Running Shoes",
    description: "Lightweight running shoes with responsive cushioning",
    price: 89.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["shoes", "running", "footwear", "clothing"],
  },
  {
    id: "p36",
    name: "Denim Jeans",
    description: "Classic straight-fit denim jeans with stretch comfort",
    price: 49.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["jeans", "denim", "pants", "clothing"],
  },
  {
    id: "p37",
    name: "Leather Boots",
    description: "Genuine leather boots with water-resistant finish",
    price: 149.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1520219306100-ec69c7d8c72d?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["boots", "leather", "footwear", "clothing"],
  },
  {
    id: "p38",
    name: "Wool Sweater",
    description: "Soft merino wool sweater for warmth and comfort",
    price: 69.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["sweater", "wool", "knitwear", "clothing"],
  },

  // Home & Garden
  {
    id: "p6",
    name: "Indoor Plants Set",
    description: "Set of 3 easy-to-maintain indoor plants with decorative pots",
    price: 49.99,
    category: "home-garden",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["plants", "indoor", "home decor", "garden"],
  },
  {
    id: "p8",
    name: "Kitchen Blender",
    description: "High-power blender for smoothies and food processing",
    price: 89.99,
    category: "home-garden",
    image: "https://images.unsplash.com/photo-1619067221366-56722796695f?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["blender", "kitchen", "appliance", "home"],
  },
  {
    id: "p39",
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe, brews up to 12 cups",
    price: 79.99,
    category: "home-garden",
    image: "https://images.unsplash.com/photo-1517668698030-aaa159dc9bb1?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["coffee", "kitchen", "appliance", "home"],
  },
  {
    id: "p40",
    name: "Scented Candles Set",
    description: "Set of 4 long-lasting scented candles in decorative jars",
    price: 34.99,
    category: "home-garden",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["candles", "home decor", "scented", "home"],
  },
  {
    id: "p41",
    name: "Adjustable Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness and color temperature",
    price: 45.99,
    category: "home-garden",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["lamp", "lighting", "desk", "home"],
  },
  {
    id: "p42",
    name: "Throw Pillow Covers",
    description: "Set of 4 decorative throw pillow covers with modern patterns",
    price: 29.99,
    category: "home-garden",
    image: "https://images.unsplash.com/photo-1588844220990-fd9e475e7f0e?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["pillow", "covers", "home decor", "home"],
  },

  // Beauty
  {
    id: "p7",
    name: "Skincare Set",
    description: "Complete skincare routine set with cleanser, toner, and moisturizer",
    price: 79.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1556228852-6d35a585d566?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["skincare", "beauty", "cosmetics"],
  },
  {
    id: "p43",
    name: "Makeup Palette",
    description: "Professional eyeshadow palette with 18 highly pigmented colors",
    price: 42.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["makeup", "eyeshadow", "palette", "beauty"],
  },
  {
    id: "p44",
    name: "Hair Styling Kit",
    description: "Complete hair styling kit with dryer, straightener, and curling iron",
    price: 119.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["hair", "styling", "beauty", "appliance"],
  },
  {
    id: "p45",
    name: "Perfume",
    description: "Elegant fragrance with notes of jasmine, rose, and sandalwood",
    price: 64.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["perfume", "fragrance", "beauty"],
  },

  // Sports & Outdoors
  {
    id: "p46",
    name: "Yoga Mat",
    description: "Non-slip yoga mat with alignment markings and carrying strap",
    price: 34.99,
    category: "sports",
    image: "https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["yoga", "fitness", "mat", "exercise", "sports"],
  },
  {
    id: "p47",
    name: "Camping Tent",
    description: "Waterproof 4-person camping tent, easy setup in under 5 minutes",
    price: 129.99,
    category: "sports",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["camping", "tent", "outdoor", "sports"],
  },
  {
    id: "p48",
    name: "Basketball",
    description: "Official size and weight basketball with superior grip",
    price: 29.99,
    category: "sports",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["basketball", "ball", "sports"],
  },
  {
    id: "p49",
    name: "Fitness Tracker",
    description: "Waterproof fitness tracker with heart rate monitoring and GPS",
    price: 89.99,
    category: "sports",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e3fd59f?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["fitness", "tracker", "wearable", "sports"],
  },

  // Books
  {
    id: "p50",
    name: "Fiction Bestseller",
    description: "Award-winning fiction novel that topped the bestseller charts",
    price: 24.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["book", "fiction", "novel", "reading"],
  },
  {
    id: "p51",
    name: "Cookbook",
    description: "Collection of 100 easy and delicious recipes for everyday cooking",
    price: 32.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["book", "cookbook", "recipes", "cooking"],
  },
  {
    id: "p52",
    name: "Self-Help Book",
    description: "Bestselling self-improvement book for personal growth and success",
    price: 19.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["book", "self-help", "motivational", "reading"],
  },

  // Toys & Games
  {
    id: "p53",
    name: "Board Game",
    description: "Strategic family board game for 2-6 players, ages 8 and up",
    price: 34.99,
    category: "toys",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["game", "board game", "family", "toys"],
  },
  {
    id: "p54",
    name: "Remote Control Car",
    description: "High-speed remote control car with 4WD and long battery life",
    price: 49.99,
    category: "toys",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["car", "remote control", "toys"],
  },
  {
    id: "p55",
    name: "Building Blocks Set",
    description: "Creative building blocks set with 500+ pieces for endless possibilities",
    price: 39.99,
    category: "toys",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["blocks", "building", "creative", "toys"],
  },

  // Food & Beverages
  {
    id: "p56",
    name: "Gourmet Coffee Beans",
    description: "Premium single-origin coffee beans, medium roast, 1lb bag",
    price: 18.99,
    category: "food",
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["coffee", "beans", "gourmet", "food"],
  },
  {
    id: "p57",
    name: "Chocolate Gift Box",
    description: "Luxury assorted chocolate gift box with 24 handcrafted pieces",
    price: 29.99,
    category: "food",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["chocolate", "gift", "sweets", "food"],
  },
  {
    id: "p58",
    name: "Specialty Tea Set",
    description: "Collection of 6 premium loose leaf teas from around the world",
    price: 24.99,
    category: "food",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=400&auto=format&fit=crop",
    inStock: true,
    tags: ["tea", "loose leaf", "beverage", "food"],
  },
];

export const searchProducts = (query: string): Product[] => {
  const lowerCaseQuery = query.toLowerCase().trim();

  // Handle special case for broader category terms
  if (lowerCaseQuery.includes("electronic") || lowerCaseQuery.includes("electronics")) {
    return products.filter(product => product.category === "electronics");
  }

  if (lowerCaseQuery.includes("cloth") || lowerCaseQuery.includes("clothing")) {
    return products.filter(product => product.category === "clothing");
  }

  if (lowerCaseQuery.includes("beauty") || lowerCaseQuery.includes("cosmetic")) {
    return products.filter(product => product.category === "beauty");
  }

  if (lowerCaseQuery.includes("home") || lowerCaseQuery.includes("garden")) {
    return products.filter(product => product.category === "home-garden");
  }

  if (lowerCaseQuery.includes("sport") || lowerCaseQuery.includes("outdoor")) {
    return products.filter(product => product.category === "sports");
  }

  if (lowerCaseQuery.includes("book") || lowerCaseQuery.includes("read")) {
    return products.filter(product => product.category === "books");
  }

  if (lowerCaseQuery.includes("toy") || lowerCaseQuery.includes("game")) {
    return products.filter(product => product.category === "toys");
  }

  if (lowerCaseQuery.includes("food") || lowerCaseQuery.includes("beverage") || lowerCaseQuery.includes("drink")) {
    return products.filter(product => product.category === "food");
  }

  // Standard search for more specific queries
  return products.filter((product) => {
    // Check if the query matches product name, description, or tags
    const nameMatch = product.name.toLowerCase().includes(lowerCaseQuery);
    const descMatch = product.description.toLowerCase().includes(lowerCaseQuery);
    const tagMatch = product.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery));
    const categoryMatch = product.category.toLowerCase().includes(lowerCaseQuery);

    // For category matches, also check category names for better matching
    const categoryNameMatch = categories.some(
      category =>
        category.id === product.category &&
        (category.name.toLowerCase().includes(lowerCaseQuery) ||
         category.description.toLowerCase().includes(lowerCaseQuery))
    );

    return nameMatch || descMatch || tagMatch || categoryMatch || categoryNameMatch;
  });
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((product) => product.category === categoryId);
};

export const getProductById = (productId: string): Product | undefined => {
  return products.find((product) => product.id === productId);
};
