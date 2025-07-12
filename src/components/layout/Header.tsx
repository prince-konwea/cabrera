import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Fine Art', href: '/category/fine-art' },
    { name: 'Antiques', href: '/category/antiques' },
    { name: 'Jewelry', href: '/category/jewelry' },
    { name: 'Collectibles', href: '/category/collectibles' },
    { name: 'Exhibitions', href: '/exhibitions' },
    { name: 'About', href: '/about' },
    { name: 'Insights', href: '/insights' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo - hidden on mobile, visible on desktop */}
          <Link to="/" className="hidden lg:flex items-center space-x-2 min-w-0 lg:flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center flex-shrink-0">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-sm sm:text-lg lg:text-2xl font-bold text-gray-900 font-serif italic bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent truncate">
                Cabrera Gems & Artistry
              </h1>
              <p className="text-xs text-gray-600 tracking-wide truncate hidden sm:block">FINE ART • ANTIQUES • LUXURY JEWELRY</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-amber-700'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions - right side (desktop only) */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 justify-end">
            <button className="p-2 text-gray-700 hover:text-amber-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-700 hover:text-amber-600 transition-colors">
              <User className="w-5 h-5" />
            </button>
            <Link to="/wishlist" className="p-2 text-gray-700 hover:text-amber-600 transition-colors relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>
            <Link to="/cart" className="p-2 text-gray-700 hover:text-amber-600 transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                1
              </span>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center justify-between w-full">
            {/* Left side - Account and Search */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-700 hover:text-amber-600 transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-700 hover:text-amber-600 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Right side - Wishlist, Cart, and Menu */}
            <div className="flex items-center space-x-4">
              <Link to="/wishlist" className="p-2 text-gray-700 hover:text-amber-600 transition-colors relative">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </Link>
              <Link to="/cart" className="p-2 text-gray-700 hover:text-amber-600 transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  1
                </span>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden py-4 border-t border-gray-100"
          >
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-amber-700 bg-amber-50'
                      : 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;