import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Image as ImageIcon, 
  Users, 
  BarChart3, 
  Settings,
  Crown,
  Upload,
  Eye,
  Edit
} from 'lucide-react';
import ProductManager from '../components/admin/ProductManager';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const stats = [
    { label: 'Total Products', value: '156', change: '+12%', color: 'text-blue-600' },
    { label: 'Active Listings', value: '142', change: '+8%', color: 'text-green-600' },
    { label: 'Sold This Month', value: '23', change: '+15%', color: 'text-amber-600' },
    { label: 'Total Revenue', value: '$2.4M', change: '+22%', color: 'text-purple-600' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductManager />;
      case 'media':
        return <MediaLibrary />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <ProductManager />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 py-4 sm:py-0 gap-3 sm:gap-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 italic">
                  Cabrera Gems & Artistry
                </h1>
                <p className="text-xs text-gray-600">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:inline">Welcome back, Admin</span>
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 font-semibold text-sm">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-4 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-xs sm:text-sm font-medium ${stat.color}`}>
                  {stat.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex flex-wrap sm:flex-nowrap space-x-2 sm:space-x-8 px-2 sm:px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-2 sm:py-4 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors flex items-center space-x-1 sm:space-x-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-amber-600 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// Media Library Component
const MediaLibrary = () => {
  const [images] = useState([
    {
      id: '1',
      url: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=400',
      name: 'starry-night-study.jpg',
      size: '2.4 MB',
      uploadDate: '2024-03-15'
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=400',
      name: 'mona-lisa-study.jpg',
      size: '1.8 MB',
      uploadDate: '2024-03-10'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Media Library</h2>
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center">
          <Upload className="w-5 h-5 mr-2" />
          Upload Images
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((image) => (
          <div key={image.id} className="group relative">
            <img
              src={image.url}
              alt={image.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Eye className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Edit className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-900 truncate">{image.name}</p>
              <p className="text-xs text-gray-500">{image.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Analytics Component
const Analytics = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-gray-900">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sales Analytics</h3>
          <p className="text-gray-600">Detailed sales reports and trends coming soon</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Insights</h3>
          <p className="text-gray-600">Customer behavior and preferences analysis</p>
        </div>
      </div>
    </div>
  );
};

// Settings Component
const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-gray-900">Settings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Name
              </label>
              <input
                type="text"
                defaultValue="Cabrera Gems & Artistry"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                defaultValue="info@cabreragems.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Display Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Show prices publicly</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Enable wishlist feature</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;