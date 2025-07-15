import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageUpload from './ImageUpload';
import { uploadToCloudinary } from '../../utils/imageUpload';
import { createProduct, updateProduct } from '../../utils/imageApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProductFormProps {
  onSave: (formData: any) => void;
  onCancel: () => void;
  product?: any;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSave, onCancel, product }) => {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    category: product?.category || '',
    price: product?.price?.toString() || '',
  });
  const [imageUrls, setImageUrls] = useState<string[]>(product?.imageUrls || []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (files: File[]) => {
    setUploading(true);
    setUploadError(null);
    try {
      const uploaded = await Promise.all(
        files.map(file => uploadToCloudinary(file, formData.category))
      );
      setImageUrls(prev => [...prev, ...uploaded.map(img => img.url)]);
      toast.success('Image(s) uploaded successfully!');
    } catch (err) {
      setUploadError('Failed to upload one or more images.');
      toast.error('Failed to upload one or more images.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);
    if (!formData.title || !formData.description || !formData.category || !formData.price || imageUrls.length === 0) {
      setSubmitError('Please fill all fields and upload at least one image.');
      toast.error('Please fill all fields and upload at least one image.');
      return;
    }
    const payload = {
      title: formData.title,
      description: formData.description,
      imageUrls,
      category: formData.category,
      price: Number(formData.price),
    };
    try {
      if (product && product._id) {
        await updateProduct(product._id, payload);
        setSubmitSuccess('Product updated successfully!');
        toast.success('Product updated successfully!');
      } else {
        await createProduct(payload);
        setSubmitSuccess('Product created successfully!');
        toast.success('Product created successfully!');
      }
      setFormData({ title: '', description: '', category: '', price: '' });
      setImageUrls([]);
      onSave(payload);
    } catch (error) {
      setSubmitError(product && product._id ? 'Failed to update product.' : 'Failed to create product.');
      toast.error(product && product._id ? 'Failed to update product.' : 'Failed to create product.');
    }
  };

  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'fine-art', label: 'Fine Art' },
    { value: 'antiques', label: 'Antiques' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'collectibles', label: 'Collectibles' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-3 sm:p-6 max-w-full sm:max-w-4xl mx-auto"
    >
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-900">
          Add New Product
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          ×
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Product Title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Product Description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Product Price"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">Product Images *</label>
          <ImageUpload onImageUpload={handleImageUpload} />
          {uploading && <p className="text-amber-600 mt-2">Uploading images...</p>}
          {uploadError && <p className="text-red-600 mt-2">{uploadError}</p>}
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img src={url} alt={`Uploaded ${idx + 1}`} className="w-full h-24 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="Delete image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Save Product
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProductForm;