import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, X, ArrowLeft } from 'lucide-react';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      title: "The Starry Night Study",
      artist: "Vincent van Gogh",
      price: "$850,000",
      priceType: "fixed",
      image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Fine Art",
      dateAdded: "2024-03-15"
    },
    {
      id: 2,
      title: "Mona Lisa Study",
      artist: "Leonardo da Vinci",
      price: "$485,000",
      priceType: "fixed",
      image: "https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Fine Art",
      dateAdded: "2024-03-10"
    },
    {
      id: 3,
      title: "The Starry Night Study II",
      artist: "Vincent van Gogh",
      price: "Request Price",
      priceType: "request",
      image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Fine Art",
      dateAdded: "2024-03-08"
    },
    {
      id: 4,
      title: "Mona Lisa Study II",
      artist: "Leonardo da Vinci",
      price: "$750,000",
      priceType: "fixed",
      image: "https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Fine Art",
      dateAdded: "2024-03-05"
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Heart className="w-24 h-24 text-gray-400 mx-auto mb-8" />
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
            <p className="text-xl text-gray-600 mb-8">
              Save your favorite pieces to easily find them later
            </p>
            <Link 
              to="/category/fine-art"
              className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Browse Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Your Wishlist</h1>
          <p className="text-gray-600">{wishlistItems.length} saved pieces</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    to={`/product/${item.id}`}
                    className="flex-1 bg-white/90 hover:bg-white text-gray-900 py-2 px-3 rounded-lg font-medium text-sm text-center transition-colors flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Link>
                  <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-3 rounded-lg font-medium text-sm transition-colors flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    {item.priceType === 'request' ? 'Inquire' : 'Add to Cart'}
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    Added {formatDate(item.dateAdded)}
                  </span>
                </div>
                
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-1 hover:text-amber-600 cursor-pointer transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-3 text-sm">{item.artist}</p>
                
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-amber-600">{item.price}</p>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors">
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link 
            to="/category/fine-art"
            className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
        </div>

        {/* Wishlist Tips */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Make the Most of Your Wishlist</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Favorites</h3>
              <p className="text-gray-600 text-sm">Keep track of pieces you're interested in for future consideration</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Price Alerts</h3>
              <p className="text-gray-600 text-sm">Get notified when prices change or similar pieces become available</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Purchase</h3>
              <p className="text-gray-600 text-sm">Quickly move items from wishlist to cart when you're ready to buy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;