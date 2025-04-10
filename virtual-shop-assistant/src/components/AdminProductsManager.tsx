import type React from 'react';
import { useState } from 'react';
import { useProducts } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Image from 'next/image';

type ProductFormData = {
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  tags: string;
  inStock: boolean;
};

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  price: '',
  category: 'electronics',
  image: '',
  tags: '',
  inStock: true,
};

export function AdminProductsManager() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!formData.name || !formData.description || !formData.price || !formData.image) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // Parse price as a number
      const price = Number.parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        toast.error('Please enter a valid price');
        return;
      }

      // Split tags by comma
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);

      const productData = {
        name: formData.name,
        description: formData.description,
        price,
        category: formData.category,
        image: formData.image,
        inStock: formData.inStock,
        tags,
      };

      if (editingId) {
        updateProduct(editingId, productData);
        toast.success(`Product "${formData.name}" updated successfully`);
      } else {
        addProduct(productData);
        toast.success(`Product "${formData.name}" added successfully`);
      }

      resetForm();
    } catch (error) {
      toast.error('Error saving product. Please try again.');
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        image: product.image,
        tags: product.tags.join(', '),
        inStock: product.inStock,
      });
      setEditingId(id);
      setIsAdding(true);

      // Scroll to form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      toast.success('Product deleted successfully');

      // If editing the product that's being deleted, reset the form
      if (editingId === id) {
        resetForm();
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>

      {!isAdding ? (
        <Button
          className="mb-6"
          onClick={() => setIsAdding(true)}
        >
          Add New Product
        </Button>
      ) : (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Product' : 'Add New Product'}</CardTitle>
            <CardDescription>
              {editingId
                ? `You are editing product ID: ${editingId}`
                : 'Fill in the details to add a new product'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Product Name*
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Price*
                  </label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price (e.g. 99.99)"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category*
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="home-garden">Home & Garden</option>
                    <option value="beauty">Beauty</option>
                    <option value="sports">Sports & Outdoors</option>
                    <option value="books">Books</option>
                    <option value="toys">Toys & Games</option>
                    <option value="food">Food & Beverages</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium">
                    Image URL*
                  </label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description*
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="tags" className="text-sm font-medium">
                    Tags (comma separated)
                  </label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Enter tags (e.g. electronics, gadget, wireless)"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="inStock"
                    name="inStock"
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={handleCheckboxChange}
                    className="rounded"
                  />
                  <label htmlFor="inStock" className="text-sm font-medium">
                    In Stock
                  </label>
                </div>
              </div>

              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Image Preview:</p>
                  <div className="relative w-40 h-40 rounded overflow-hidden border">
                    <Image
                      src={formData.image}
                      alt="Product preview"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=Image+Error';
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex space-x-2 pt-4">
                <Button type="submit">
                  {editingId ? 'Update Product' : 'Add Product'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold">Product List ({products.length})</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=Image+Error';
                  }}
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
                </div>
                <CardDescription>
                  Category: {product.category}
                  {!product.inStock && <span className="text-red-500 ml-2">Out of Stock</span>}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm line-clamp-2">{product.description}</p>
                {product.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {product.tags.map(tag => (
                      <span key={tag} className="text-xs bg-blue-100 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button size="sm" variant="outline" onClick={() => handleEdit(product.id)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <p>No products found. Add your first product!</p>
          </div>
        )}
      </div>
    </div>
  );
}
