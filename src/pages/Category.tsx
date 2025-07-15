import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImageModal from '../components/ImageModal';
import ImageWithFallback from '../components/ImageWithFallback';
import { api } from '../utils/imageApi';
import { Eye, ShoppingBag, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice';

const categoryData: Record<string, { title: string; description: string }> = {
  'fine-art': { title: 'Fine Art', description: 'Explore our curated collection of fine art.' },
  'antiques': { title: 'Antiques', description: 'Discover rare and valuable antiques.' },
  'jewelry': { title: 'Jewelry', description: 'Browse exquisite jewelry pieces.' },
  'collectibles': { title: 'Collectibles', description: 'Find unique collectibles.' },
};

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalAlt, setModalAlt] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addToCartMsg, setAddToCartMsg] = useState<string | null>(null);
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: any) => state.wishlist.items);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/products');
        const allProducts = response.data;
        // Filter by category
        const filtered = allProducts.filter((p: any) => p.category === category);
        setProducts(filtered);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  const handleImageClick = (image: string, alt?: string) => {
    setModalImage(image);
    setModalAlt(alt);
    setModalOpen(true);
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({
      id: product._id, // always use _id as id
      title: product.title,
      price: product.price,
      image: product.imageUrls?.[0],
      quantity: 1,
      // add other fields as needed
    }));
    setAddToCartMsg('Added to cart!');
    setTimeout(() => setAddToCartMsg(null), 1500);
  };

  const handleToggleWishlist = (product: any) => {
    const isInWishlist = wishlistItems.some((item: any) => item.id === product._id);
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist({
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.imageUrls?.[0],
      }));
    }
  };

  const categoryInfo = categoryData[category as string] || { title: category, description: '' };

  return (
    <div className="min-h-screen bg-stone-50">
      <ImageModal open={modalOpen} image={modalImage || ''} alt={modalAlt} onClose={() => setModalOpen(false)} />
      {addToCartMsg && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-amber-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {addToCartMsg}
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">{categoryInfo.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{categoryInfo.description}</p>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 text-xl py-24">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600 text-xl py-24">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 text-xl py-24">No products found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item, index) => (
              <motion.div
                key={item._id || item.id || index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative group">
                  <button
                    className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${wishlistItems.some((item: any) => item.id === item._id) ? 'bg-amber-600 text-white' : 'bg-white/90 text-gray-600 hover:bg-amber-100'}`}
                    onClick={() => handleToggleWishlist(item)}
                    type="button"
                  >
                    <Heart className={`w-5 h-5 ${wishlistItems.some((w: any) => w.id === item._id) ? 'fill-current' : ''}`} />
                  </button>
                            <ImageWithFallback
                    src={item.imageUrls?.[0]}
                              alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                    fallbackText={`${item.title}`}
                    onClick={() => handleImageClick(item.imageUrls?.[0], item.title)}
                            />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="flex-1 bg-white/90 hover:bg-white text-gray-900 py-2 px-3 rounded-lg font-medium text-sm text-center transition-colors flex items-center justify-center"
                      onClick={() => handleImageClick(item.imageUrls?.[0], item.title)}
                      type="button"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-3 rounded-lg font-medium text-sm transition-colors flex items-center justify-center"
                      onClick={() => handleAddToCart(item)}
                      type="button"
                    >
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      Add to Cart
                    </button>
                          </div>
                        </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-gray-900 mb-1 hover:text-amber-600 cursor-pointer transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-amber-600">${item.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;