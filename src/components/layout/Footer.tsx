import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                  <path d="M12 4L9.5 9L4 9.5L8 13.5L7 19L12 16L17 19L16 13.5L20 9.5L14.5 9L12 4Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold font-serif italic bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Cabrera Gems & Artistry
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Curating exceptional fine art, antiques, and luxury jewelry for discerning collectors worldwide since 1952.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Collections</h4>
            <ul className="space-y-2">
              <li><Link to="/category/fine-art" className="text-gray-400 hover:text-amber-400 transition-colors">Fine Art</Link></li>
              <li><Link to="/category/antiques" className="text-gray-400 hover:text-amber-400 transition-colors">Antiques</Link></li>
              <li><Link to="/category/jewelry" className="text-gray-400 hover:text-amber-400 transition-colors">Jewelry</Link></li>
              <li><Link to="/category/collectibles" className="text-gray-400 hover:text-amber-400 transition-colors">Rare Collectibles</Link></li>
              <li><Link to="/exhibitions" className="text-gray-400 hover:text-amber-400 transition-colors">Exhibitions</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services/appraisal" className="text-gray-400 hover:text-amber-400 transition-colors">Appraisal Services</Link></li>
              <li><Link to="/services/restoration" className="text-gray-400 hover:text-amber-400 transition-colors">Restoration</Link></li>
              <li><Link to="/services/authentication" className="text-gray-400 hover:text-amber-400 transition-colors">Authentication</Link></li>
              <li><Link to="/services/consignment" className="text-gray-400 hover:text-amber-400 transition-colors">Consignment</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-amber-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span className="text-gray-400 text-sm">123 Gallery Street, New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400" />
                <span className="text-gray-400 text-sm">info@galleryheritage.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Gallery Heritage. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/shipping" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
              Shipping & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;