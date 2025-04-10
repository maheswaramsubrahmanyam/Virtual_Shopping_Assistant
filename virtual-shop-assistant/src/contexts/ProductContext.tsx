import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { type Product, products as initialProducts } from '@/data/products';

type ProductContextType = {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Omit<Product, 'id'>>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
};

const ProductContext = createContext<ProductContextType | null>(null);

const LOCAL_STORAGE_KEY = 'shop_products';

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Initialize products from localStorage or use initial data
  useEffect(() => {
    const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialProducts));
    }
  }, []);

  // Update localStorage when products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `p${Date.now()}`,
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Omit<Product, 'id'>>) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, ...updatedFields }
          : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !== id)
    );
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
