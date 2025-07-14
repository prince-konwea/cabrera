import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2, Shield, Truck, Award, ZoomIn, Users, Calendar } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import ImageModal from '../components/ImageModal';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const stored = localStorage.getItem('products');
    if (stored) {
      const products = JSON.parse(stored);
      const prod = products.find((p: any) => String(p.id) === String(id));
      setProduct(prod);
      if (prod) {
        setRelatedProducts(products.filter((p: any) => p.category === prod.category && String(p.id) !== String(id)));
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">Product not found.</div>
      </div>
    );
  }

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'provenance', label: 'Provenance' },
    { id: 'shipping', label: 'Shipping' }
  ];

  const handleImageClick = () => {
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <ImageModal 
        open={modalOpen} 
        image={product.images?.[selectedImage]} 
        alt={product.title} 
        onClose={() => setModalOpen(false)} 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-amber-600">Home</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link to={`/category/${product.category?.toLowerCase().replace(/\s/g, '-')}`} className="hover:text-amber-600">{product.category}</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
              <ImageWithFallback
                src={product.images?.[selectedImage]}
                alt={product.title}
                className="w-full h-96 object-cover cursor-zoom-in"
                fallbackText={`${product.title} - ${product.artist}`}
                onClick={handleImageClick}
              />
              <button
                onClick={handleImageClick}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
            <div className="flex space-x-2">
              {product.images?.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-amber-600' : 'border-gray-200'}`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                    fallbackText={`${product.title} ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-xl text-gray-600 mb-1">{product.artist}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full">{product.category}</span>
              {product.medium && <span className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full">{product.medium}</span>}
            </div>
            <div className="text-3xl font-bold text-amber-600">{product.price}</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-900">Dimensions:</span>
                <p className="text-gray-600">{product.dimensions}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Condition:</span>
                <p className="text-gray-600">{product.condition}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                {product.priceType === 'request' ? 'Request Price' : 'Inquire About This Piece'}
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            {/* Trust Signals */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Buy from Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span className="text-sm text-gray-700">Expert authentication & lifetime guarantee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-amber-600" />
                  <span className="text-sm text-gray-700">Fully insured shipping & handling</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-amber-600" />
                  <span className="text-sm text-gray-700">White-glove delivery service</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? 'border-amber-600 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
              </div>
            )}
            {activeTab === 'provenance' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Provenance</h3>
                <p className="text-gray-700 leading-relaxed">{product.provenance}</p>
                <h3 className="text-xl font-semibold text-gray-900 mt-6">Exhibition History</h3>
                <p className="text-gray-700 leading-relaxed">{product.exhibition}</p>
                <h3 className="text-xl font-semibold text-gray-900 mt-6">Literature</h3>
                <p className="text-gray-700 leading-relaxed">{product.literature}</p>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Shipping & Delivery</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Truck className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">White-Glove Delivery</p>
                        <p className="text-sm text-gray-600">{product.shipping?.method}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Insurance Coverage</p>
                        <p className="text-sm text-gray-600">{product.shipping?.insurance}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Delivery Time</p>
                        <p className="text-sm text-gray-600">{product.shipping?.timeframe}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Related Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <Link to={`/product/${item.id}`}>
                  <div className="relative">
                    <ImageWithFallback
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                      fallbackText={`${item.title} - ${item.artist}`}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-1">{item.artist}</p>
                    <p className="text-amber-600 font-semibold text-lg">{item.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;