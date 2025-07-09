import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Heart, Eye } from 'lucide-react';

const Category = () => {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    era: 'all',
    style: 'all'
  });

  const categoryData = {
    'fine-art': {
      title: 'Fine Art',
      description: 'Masterpieces by renowned artists from around the world',
      filters: {
        era: ['Renaissance', 'Baroque', 'Impressionist', 'Modern', 'Contemporary'],
        style: ['Portrait', 'Landscape', 'Still Life', 'Abstract', 'Sculpture']
      }
    },
    'antiques': {
      title: 'Antiques',
      description: 'Rare historical treasures and collectible pieces',
      filters: {
        era: ['18th Century', '19th Century', 'Early 20th Century', 'Mid Century'],
        style: ['Furniture', 'Decorative Arts', 'Ceramics', 'Textiles', 'Clocks']
      }
    },
    'jewelry': {
      title: 'Jewelry',
      description: 'Exquisite luxury jewelry and precious stones',
      filters: {
        era: ['Victorian', 'Edwardian', 'Art Deco', 'Mid Century', 'Contemporary'],
        style: ['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Brooches']
      }
    },
    'collectibles': {
      title: 'Rare Collectibles',
      description: 'Unique and rare finds for discerning collectors',
      filters: {
        era: ['19th Century', '20th Century', 'Contemporary'],
        style: ['Coins', 'Stamps', 'Books', 'Manuscripts', 'Memorabilia']
      }
    }
  };

  const products = [
    {
      id: 1,
      title: "The Starry Night Study",
      artist: "Vincent van Gogh",
      price: "$850,000",
      image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800",
      era: "Post-Impressionist",
      style: "Landscape"
    },
    {
      id: 2,
      title: "Mona Lisa Study",
      artist: "Leonardo da Vinci",
      price: "Request Price",
      image: "https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=800",
      era: "Renaissance",
      style: "Portrait"
    },
    {
      id: 3,
      title: "The Starry Night Study II",
      artist: "Vincent van Gogh",
      price: "$1,200,000",
      image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800",
      era: "Post-Impressionist",
      style: "Landscape"
    },
    {
      id: 4,
      title: "Mona Lisa Study II",
      artist: "Leonardo da Vinci",
      price: "$750,000",
      image: "https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=800",
      era: "Renaissance",
      style: "Portrait"
    },
    {
      id: 5,
      title: "The Starry Night Study III",
      artist: "Vincent van Gogh",
      price: "$450,000",
      image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800",
      era: "Post-Impressionist",
      style: "Landscape"
    },
    {
      id: 6,
      title: "Mona Lisa Study III",
      artist: "Leonardo da Vinci",
      price: "Request Price",
      image: "https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=800",
      era: "Renaissance",
      style: "Portrait"
    }
  ];

  const currentCategory = categoryData[category as keyof typeof categoryData];

  if (!currentCategory) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">
              {currentCategory.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {currentCategory.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <Filter className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              </div>

              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Range
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-100k">Under $100,000</option>
                    <option value="100k-500k">$100,000 - $500,000</option>
                    <option value="500k-1m">$500,000 - $1,000,000</option>
                    <option value="1m+">Over $1,000,000</option>
                  </select>
                </div>

                {/* Era */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Era
                  </label>
                  <select
                    value={filters.era}
                    onChange={(e) => setFilters({...filters, era: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="all">All Eras</option>
                    {currentCategory.filters.era.map((era) => (
                      <option key={era} value={era}>{era}</option>
                    ))}
                  </select>
                </div>

                {/* Style */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Style
                  </label>
                  <select
                    value={filters.style}
                    onChange={(e) => setFilters({...filters, style: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="all">All Styles</option>
                    {currentCategory.filters.style.map((style) => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="lg:w-3/4">
            {/* Controls */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {products.length} pieces
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex bg-white rounded-lg shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-amber-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-amber-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative group ${viewMode === 'list' ? 'w-1/3' : 'w-full'}`}>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                          viewMode === 'list' ? 'w-full h-48' : 'w-full h-64'
                        }`}
                      />
                    </Link>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className={`p-6 ${viewMode === 'list' ? 'w-2/3 flex flex-col justify-between' : ''}`}>
                    <div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 hover:text-amber-600 cursor-pointer transition-colors">
                          {product.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-2">{product.artist}</p>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                          {product.era}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                          {product.style}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-amber-600">{product.price}</p>
                      <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                        Inquire
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;