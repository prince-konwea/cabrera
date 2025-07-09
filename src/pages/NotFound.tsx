import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-9xl font-serif font-bold text-amber-600 mb-4">404</div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved to our private collection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Link>
            <Link 
              to="/category/fine-art"
              className="inline-flex items-center border border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Browse Collection
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;