import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Product } from '@/data/products';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="relative w-full pt-[75%]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-2">
        <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        <Button
          variant={product.inStock ? "default" : "outline"}
          size="sm"
          onClick={() => product.inStock && onAddToCart(product)}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}
