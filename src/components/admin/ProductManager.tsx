import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import ProductForm from './ProductForm';
import { api, updateProduct, deleteProduct } from '../../utils/imageApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | undefined>();
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted successfully!');
        setProducts(products.filter((p) => p._id !== id));
      } catch {
        toast.error('Failed to delete product.');
      }
    }
  };

  const handleSaveProduct = async (formData: any) => {
    if (editingProduct) {
      // Update existing product
      try {
        await updateProduct(editingProduct._id, {
          title: formData.title,
          description: formData.description,
          imageUrls: formData.imageUrls || formData.images || [],
          category: formData.category,
          price: Number(formData.price),
        });
        toast.success('Product updated successfully!');
        setShowForm(false);
        setEditingProduct(undefined);
        fetchProducts();
      } catch {
        toast.error('Failed to update product.');
      }
    } else {
      // New product is handled in ProductForm
      setShowForm(false);
      setEditingProduct(undefined);
      fetchProducts();
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'fine-art', label: 'Fine Art' },
    { value: 'antiques', label: 'Antiques' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'collectibles', label: 'Collectibles' }
  ];

  if (showForm) {
    return (
      <ProductForm
        onSave={handleSaveProduct}
        onCancel={() => {
          setShowForm(false);
          setEditingProduct(undefined);
        }}
        product={editingProduct}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600">Manage your art collection and inventory</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingProduct(undefined); }}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Product
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>
      {loading ? (
        <div className="text-center text-gray-500 text-xl py-24">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600 text-xl py-24">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id || product.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative grid grid-cols-1 gap-1 p-2 bg-gray-50">
                <img
                  src={product.imageUrls?.[0]}
                  alt={product.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1 sm:gap-0">
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="text-lg font-bold text-amber-600 mb-4">${product.price}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductManager;