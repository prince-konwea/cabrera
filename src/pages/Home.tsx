import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Shield, Truck, Clock } from 'lucide-react';
import showroom1 from '../assets/showroom1.jpeg';
import showroom2 from '../assets/showroom2.jpeg';
import showroom3 from '../assets/showroom3.jpeg';
import showroom4 from '../assets/showroom4.jpeg';
import showroom from '../assets/showroom.jpeg';
import photo1 from '../assets/photo1.jpeg';
import antique1 from '../assets/antique (1).jpeg';
import antique7 from '../assets/antique (7).jpeg';
import antique13 from '../assets/antique (13).jpeg';
import ImageModal from '../components/ImageModal';

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalAlt, setModalAlt] = useState<string | undefined>(undefined);

  const handleImageClick = (image: string, alt?: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setModalImage(image);
    setModalAlt(alt);
    setModalOpen(true);
  };

  useEffect(() => {
    const stored = localStorage.getItem('products');
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  // Group products by category
  const categories = [
    { value: 'fine-art', label: 'Fine Art' },
    { value: 'antiques', label: 'Antiques' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'collectibles', label: 'Collectibles' }
  ];

  // Featured: show up to 6 most recent products
  const featuredItems = products.slice(0, 6);

  const trustSignals = [
    {
      icon: Award,
      title: "Expert Authentication",
      description: "Every piece authenticated by certified experts"
    },
    {
      icon: Shield,
      title: "Lifetime Guarantee",
      description: "Full authenticity guarantee for life"
    },
    {
      icon: Truck,
      title: "Secure Shipping",
      description: "White-glove delivery and insurance"
    },
    {
      icon: Clock,
      title: "75+ Years Experience",
      description: "Trusted by collectors since 1952"
    }
  ];

  return (
    <div className="min-h-screen">
      <ImageModal open={modalOpen} image={modalImage || ''} alt={modalAlt} onClose={() => setModalOpen(false)} />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1920')"
          }}
        />
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            Cabrera Gems & Artistry
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 font-light"
          >
            Discover extraordinary fine art, antiques, and jewelry from around the world
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/category/fine-art" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Explore Collections
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/about" 
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Featured Masterpieces</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked exceptional pieces from our current collection
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">No products available yet.</p>
            ) : (
              featuredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Link to={`/product/${item.id}`}>
                    <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
                      <img
                        src={item.images[0] || '/placeholder-image.jpg'}
                        alt={item.title}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                        onClick={e => handleImageClick(item.images[0] || '/placeholder-image.jpg', item.title, e)}
                      />
                      <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {categories.find(c => c.value === item.category)?.label || item.category}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.artist}</p>
                      <p className="text-2xl font-bold text-amber-600">{item.price}</p>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated collections
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 'fine-art', label: 'Fine Art', image: photo1 },
              { value: 'antiques', label: 'Antiques', image: antique1 },
              { value: 'jewelry', label: 'Jewelry', image: antique7 },
              { value: 'collectibles', label: 'Collectibles', image: antique13 }
            ].map((category, index) => {
              const catProducts = products.filter(p => p.category === category.value);
              return (
                <motion.div
                  key={category.value}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link 
                    to={`/category/${category.value}`}
                    className="group block relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="aspect-w-3 aspect-h-4 relative">
                      <img
                        src={category.image}
                        alt={category.label}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                        onClick={e => handleImageClick(category.image, category.label, e)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-serif font-bold mb-2">{category.label}</h3>
                      <p className="text-sm opacity-90">{catProducts.length} item(s) in this category</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Showroom Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Showroom</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience our elegant gallery space where masterpieces come to life
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { image: showroom1, title: "Main Gallery", description: "Our primary exhibition space" },
              { image: showroom2, title: "Private Viewing Room", description: "Intimate settings for serious collectors" },
              { image: showroom3, title: "Antiques Salon", description: "Dedicated space for antique pieces" },
              { image: showroom4, title: "Jewelry Vault", description: "Secure display for precious jewelry" }
            ].map((room, index) => (
              <motion.div
                key={room.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-serif font-bold mb-1">{room.title}</h3>
                    <p className="text-sm opacity-90">{room.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/contact" 
              className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Schedule a Visit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Why Collectors Trust Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three generations of expertise in fine art and antiques
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustSignals.map((signal, index) => (
              <motion.div
                key={signal.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <signal.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{signal.title}</h3>
                <p className="text-gray-600">{signal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Stay Informed</h2>
          <p className="text-xl mb-8 opacity-90">
            Be the first to know about new acquisitions and exclusive exhibitions
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;