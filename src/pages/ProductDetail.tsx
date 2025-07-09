import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  Shield, 
  Truck, 
  Award, 
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  MapPin,
  Users
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Mock product data - in real app would fetch from API
  const product = {
    id: 1,
    title: "The Starry Night Study",
    artist: "Vincent van Gogh",
    year: "1889",
    price: "$850,000",
    priceType: "fixed", // or "request"
    category: "Fine Art",
    medium: "Oil on Canvas",
    dimensions: "73 x 92 cm (28.7 x 36.2 inches)",
    condition: "Excellent",
    provenance: "Private Collection, Netherlands (acquired 1890); Estate of the artist; Museum of Modern Art, New York",
    exhibition: "Post-Impressionist Exhibition, London, 1910; Van Gogh Retrospective, MoMA, 1935",
    literature: "De la Faille, Vincent van Gogh: Catalogue Raisonné, Vol. II, No. F612",
    description: "A remarkable study of van Gogh's most famous work, this piece captures the swirling energy and emotional intensity that defined the artist's revolutionary style. The dynamic brushstrokes and vibrant colors create a sense of movement and life that seems to pulse from the canvas. This work represents the pinnacle of Post-Impressionist achievement and van Gogh's unique vision of the night sky.",
    images: [
      "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    authentication: {
      certificate: "Certificate of Authenticity included",
      expert: "Authenticated by Dr. James Morrison, Former Curator, Metropolitan Museum of Art",
      guarantee: "Lifetime authenticity guarantee"
    },
    shipping: {
      method: "White-glove delivery",
      insurance: "Fully insured during transport",
      timeframe: "2-3 weeks for preparation and delivery"
    }
  };

  const relatedProducts = [
    {
      id: 2,
      title: "The Starry Night Study II",
      artist: "Vincent van Gogh",
      price: "Request Price",
      image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      title: "Mona Lisa Study",
      artist: "Leonardo da Vinci",
      price: "$1,200,000",
      image: "https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 4,
      title: "Mona Lisa Study II",
      artist: "Leonardo da Vinci",
      price: "$650,000",
      image: "https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'provenance', label: 'Provenance' },
    { id: 'authentication', label: 'Authentication' },
    { id: 'shipping', label: 'Shipping' }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-amber-600">Home</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link to="/category/fine-art" className="hover:text-amber-600">Fine Art</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-96 object-cover cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
              />
              <button
                onClick={() => setIsZoomed(true)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-amber-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-xl text-gray-600 mb-1">{product.artist}</p>
              <p className="text-gray-500">{product.year}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                {product.medium}
              </span>
            </div>

            <div className="text-3xl font-bold text-amber-600">
              {product.price}
            </div>

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
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-amber-600 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.description}
                </p>
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

            {activeTab === 'authentication' && (
              <div className="space-y-6">
                <div className="bg-amber-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Award className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">{product.authentication.certificate}</p>
                        <p className="text-sm text-gray-600">Full documentation provided with purchase</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Expert Authentication</p>
                        <p className="text-sm text-gray-600">{product.authentication.expert}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">{product.authentication.guarantee}</p>
                        <p className="text-sm text-gray-600">We stand behind every piece we sell</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                        <p className="text-sm text-gray-600">{product.shipping.method}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Insurance Coverage</p>
                        <p className="text-sm text-gray-600">{product.shipping.insurance}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Delivery Time</p>
                        <p className="text-sm text-gray-600">{product.shipping.timeframe}</p>
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
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 hover:text-amber-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{item.artist}</p>
                  <p className="text-xl font-bold text-amber-600">{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;