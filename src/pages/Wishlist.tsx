import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, X, ArrowLeft } from 'lucide-react';
import ImageModal from '../components/ImageModal';
import ImageWithFallback from '../components/ImageWithFallback';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';

const Wishlist = () => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalImage, setModalImage] = React.useState<string | null>(null);
  const [modalAlt, setModalAlt] = React.useState<string | undefined>(undefined);
  const [addToCartMsg, setAddToCartMsg] = React.useState<string | null>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleImageClick = (image: string, alt?: string) => {
    setModalImage(image);
    setModalAlt(alt);
    setModalOpen(true);
  };

  const removeFromWishlistHandler = (id: string) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (item: any) => {
    const inCart = cartItems.some((cartItem: any) => cartItem.id === item.id);
    if (!inCart) {
      dispatch(addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: 1,
      }));
      setAddToCartMsg('Added to cart!');
      setTimeout(() => setAddToCartMsg(null), 1500);
    } else {
      setAddToCartMsg('Already in cart!');
      setTimeout(() => setAddToCartMsg(null), 1500);
    }
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
      <ImageModal open={modalOpen} image={modalImage || ''} alt={modalAlt} onClose={() => setModalOpen(false)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {addToCartMsg && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-amber-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            {addToCartMsg}
          </div>
        )}
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
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                  fallbackText={item.title}
                  onClick={() => handleImageClick(item.image, item.title)}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => removeFromWishlistHandler(item.id)}
                    className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="flex-1 bg-white/90 hover:bg-white text-gray-900 py-2 px-3 rounded-lg font-medium text-sm text-center transition-colors flex items-center justify-center"
                    onClick={() => handleImageClick(item.image, item.title)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-3 rounded-lg font-medium text-sm transition-colors flex items-center justify-center"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Add to Cart
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    {/* Optionally show category if available */}
                  </span>
                </div>
                
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-1 hover:text-amber-600 cursor-pointer transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-amber-600">${item.price}</p>
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
      </div>
    </div>
  );
};

export default Wishlist;