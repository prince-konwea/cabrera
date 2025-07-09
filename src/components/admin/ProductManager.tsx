import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import ProductForm from './ProductForm';

interface Product {
  id: string;
  title: string;
  artist: string;
  year: string;
  price: string;
  priceType: 'fixed' | 'request';
  category: string;
  medium: string;
  dimensions: string;
  condition: string;
  description: string;
  provenance: string;
  exhibition: string;
  literature: string;
  images: string[];
  status: 'active' | 'draft' | 'sold';
  createdAt: string;
  updatedAt: string;
}

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: 'The Starry Night Study',
      artist: 'Vincent van Gogh',
      year: '1889',
      price: '$850,000',
      priceType: 'fixed',
      category: 'fine-art',
      medium: 'Oil on Canvas',
      dimensions: '73 x 92 cm',
      condition: 'excellent',
      description: 'A remarkable study of van Gogh\'s most famous work...',
      provenance: 'Private Collection, Netherlands...',
      exhibition: 'Post-Impressionist Exhibition, London, 1910...',
      literature: 'De la Faille, Vincent van Gogh: Catalogue Raisonné...',
      images: ['https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=400'],
      status: 'active',
      createdAt: '2024-03-15',
      updatedAt: '2024-03-15'
    },
    {
      id: '2',
      title: 'Mona Lisa Study',
      artist: 'Leonardo da Vinci',
      year: '1503',
      price: 'Request Price',
      priceType: 'request',
      category: 'fine-art',
      medium: 'Oil on Poplar',
      dimensions: '77 x 53 cm',
      condition: 'excellent',
      description: 'An exceptional study of da Vinci\'s masterpiece...',
      provenance: 'Royal Collection, France...',
      exhibition: 'Renaissance Masters, Louvre, 1920...',
      literature: 'Zöllner, Leonardo da Vinci: Complete Paintings...',
      images: ['https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=400'],
      status: 'active',
      createdAt: '2024-03-10',
      updatedAt: '2024-03-10'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleSaveProduct = (productData: any) => {
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...productData, id: editingProduct.id, updatedAt: new Date().toISOString().split('T')[0] }
          : p
      ));
    } else {
      // Add new product
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        status: 'active' as const,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    setShowForm(false);
    setEditingProduct(undefined);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'fine-art', label: 'Fine Art' },
    { value: 'antiques', label: 'Antiques' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'collectibles', label: 'Collectibles' }
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' },
    { value: 'sold', label: 'Sold' }
  ];

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onSave={handleSaveProduct}
        onCancel={() => {
          setShowForm(false);
          setEditingProduct(undefined);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600">Manage your art collection and inventory</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
          <div className="text-sm text-gray-600 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={product.images[0] || '/placeholder-image.jpg'}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  product.status === 'active' ? 'bg-green-100 text-green-800' :
                  product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1 sm:gap-0">
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                  {product.category.replace('-', ' ')}
                </span>
                <span className="text-xs text-gray-500">
                  {product.updatedAt}
                </span>
              </div>
              
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">
                {product.title}
              </h3>
              <p className="text-gray-600 mb-2">{product.artist}</p>
              <p className="text-lg font-bold text-amber-600 mb-4">{product.price}</p>
              
              <div className="flex flex-col xs:flex-row gap-2 xs:space-x-2 w-full mt-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProductManager;