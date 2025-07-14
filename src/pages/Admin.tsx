import React, { useState } from 'react';
import ImageUpload from '../components/admin/ImageUpload';
import { uploadToCloudinary } from '../utils/imageUpload';

const CATEGORIES = [
  { value: 'fine-art', label: 'Fine Art' },
  { value: 'antiques', label: 'Antiques' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'collectibles', label: 'Collectibles' },
];

const Admin = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    setUploading(true);
    setError(null);
    const results: any[] = [];
    let products = [];
    try {
      const stored = localStorage.getItem('products');
      products = stored ? JSON.parse(stored) : [];
    } catch {
      products = [];
    }
    for (const file of selectedFiles) {
      try {
        const result = await uploadToCloudinary(file, category);
        // Add to localStorage as a new product
        const newProduct = {
          id: Date.now().toString() + Math.random().toString(36).slice(2),
          title: result.filename,
          artist: '',
          price: '',
          priceType: 'fixed',
          category: category, // store the slug, not the label
          images: [result.url],
          description: '',
          dimensions: '',
          condition: '',
          provenance: '',
          exhibition: '',
          literature: '',
          shipping: {},
        };
        products.unshift(newProduct);
        results.push(result);
      } catch (err: any) {
        setError(err.message || 'Upload failed');
      }
    }
    localStorage.setItem('products', JSON.stringify(products));
    setUploadedImages(results);
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Image Upload</h1>
      <div className="w-full max-w-md space-y-4">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Category</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <ImageUpload onImageUpload={handleImageUpload} maxFiles={10} />
        <button
          className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
          onClick={handleUpload}
          disabled={uploading || selectedFiles.length === 0}
        >
          {uploading ? 'Uploading...' : 'Upload Images'}
        </button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        {uploadedImages.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Uploaded Images</h2>
            <ul className="space-y-2">
              {uploadedImages.map((img, idx) => (
                <li key={img.asset_id || idx} className="flex items-center space-x-2">
                  <img src={img.url} alt={img.filename} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <div className="text-sm font-medium">{img.filename}</div>
                    <a href={img.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">View</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;