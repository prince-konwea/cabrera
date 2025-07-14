import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImageModal from '../components/ImageModal';
import ImageWithFallback from '../components/ImageWithFallback';

const categoryData: any = {
  'fine-art': {
    title: 'Fine Art',
    description: 'Masterpieces by renowned artists from around the world',
  },
  'antiques': {
    title: 'Antiques',
    description: 'Rare historical treasures and collectible pieces',
  },
  'jewelry': {
    title: 'Jewelry',
    description: 'Exquisite luxury jewelry and precious stones',
  },
  'collectibles': {
    title: 'Rare Collectibles',
    description: 'Unique and rare finds for discerning collectors',
  },
};

const Category = () => {
  const { category } = useParams();
  console.log('category param:', category); // Debug log
  const [products, setProducts] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalAlt, setModalAlt] = useState<string | undefined>(undefined);

  useEffect(() => {
    const stored = localStorage.getItem('products');
    if (stored) {
      const allProducts = JSON.parse(stored);
      setProducts(allProducts.filter((p: any) => {
        if (!p.category) return false;
        return p.category.toLowerCase().replace(/\s/g, '-') === category;
      }));
    } else {
      setProducts([]);
    }
  }, [category]);

  const handleImageClick = (image: string, alt?: string) => {
    setModalImage(image);
    setModalAlt(alt);
    setModalOpen(true);
  };

  const categoryInfo = categoryData[category as string] || { title: category, description: '' };

  return (
    <div className="min-h-screen bg-stone-50">
      <ImageModal open={modalOpen} image={modalImage || ''} alt={modalAlt} onClose={() => setModalOpen(false)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">{categoryInfo.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{categoryInfo.description}</p>
        </div>
        {products.length === 0 ? (
          <div className="text-center text-gray-500 text-xl py-24">No products found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/product/${item.id}`}>
                  <div className="mb-4">
                    {/* Responsive grid for all images as cards, with wider cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 justify-center">
                      {(item.images || []).map((img: string, imgIdx: number) => (
                        <div key={imgIdx} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col min-w-[280px] max-w-md mx-auto">
                          <div
                            className="cursor-zoom-in w-full"
                            onClick={e => {
                              e.preventDefault();
                              handleImageClick(img, item.title);
                            }}
                          >
                            <ImageWithFallback
                              src={img}
                              alt={item.title}
                              className="w-full h-48 object-cover"
                              fallbackText={`${item.category || 'Product'} Image`}
                            />
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <h4 className="text-base font-semibold text-gray-900 mb-1 truncate">{item.title}</h4>
                            {/* Optionally add artist/price here */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-amber-600 transition-colors">{item.title}</h3>
                    <p className="text-gray-600">{item.artist}</p>
                    <p className="text-2xl font-bold text-amber-600">{item.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;