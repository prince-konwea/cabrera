import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

const Exhibitions = () => {
  const currentExhibitions = [
    {
      id: 1,
      title: "Van Gogh: The Starry Night Collection",
      subtitle: "Studies and Variations",
      description: "A comprehensive exhibition showcasing various studies and interpretations of van Gogh's most famous work, The Starry Night.",
      image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800",
      startDate: "March 15, 2024",
      endDate: "June 30, 2024",
      location: "Main Gallery",
      pieces: 25,
      featured: true
    },
    {
      id: 2,
      title: "Leonardo da Vinci: The Mona Lisa Legacy",
      subtitle: "Studies and Interpretations",
      description: "Explore the enduring influence of da Vinci's masterpiece through various studies and interpretations of the Mona Lisa.",
      image: "https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=800",
      startDate: "April 1, 2024",
      endDate: "July 15, 2024",
      location: "Renaissance Hall",
      pieces: 18,
      featured: false
    }
  ];

  const upcomingExhibitions = [
    {
      id: 3,
      title: "Post-Impressionist Revolution",
      subtitle: "Van Gogh and His Contemporaries",
      description: "Rare works from the Post-Impressionist period, showcasing the revolutionary techniques that changed art forever.",
      image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800",
      startDate: "August 1, 2024",
      endDate: "November 30, 2024",
      location: "Modern Wing",
      pieces: 30,
      featured: false
    },
    {
      id: 4,
      title: "Renaissance Portraits",
      subtitle: "The Art of da Vinci",
      description: "An exclusive exhibition featuring Renaissance portrait studies, highlighting da Vinci's mastery of human expression.",
      image: "https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=800",
      startDate: "September 15, 2024",
      endDate: "January 15, 2025",
      location: "Classical Gallery",
      pieces: 22,
      featured: false
    }
  ];

  const pastExhibitions = [
    {
      id: 5,
      title: "Van Gogh: Night Scenes",
      subtitle: "Darkness and Light",
      description: "A celebration of van Gogh's nocturnal works, featuring his unique interpretation of night scenes and starlit skies.",
      image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800",
      startDate: "October 1, 2023",
      endDate: "February 28, 2024",
      location: "Night Gallery",
      pieces: 40,
      featured: false
    },
    {
      id: 6,
      title: "Leonardo's Sketches",
      subtitle: "The Master's Process",
      description: "Magnificent sketches and preparatory works by Leonardo da Vinci, showcasing his artistic process and genius.",
      image: "https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=800",
      startDate: "June 1, 2023",
      endDate: "September 30, 2023",
      location: "Study Hall",
      pieces: 15,
      featured: false
    }
  ];

  const ExhibitionCard = ({ exhibition, index, isPast = false }: { exhibition: any, index: number, isPast?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
        exhibition.featured ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="relative">
        <img
          src={exhibition.image}
          alt={exhibition.title}
          className={`w-full object-cover ${exhibition.featured ? 'h-80' : 'h-48'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className={`font-serif font-bold mb-1 ${exhibition.featured ? 'text-3xl' : 'text-xl'}`}>
            {exhibition.title}
          </h3>
          <p className={`opacity-90 ${exhibition.featured ? 'text-lg' : 'text-sm'}`}>
            {exhibition.subtitle}
          </p>
        </div>
        {!isPast && (
          <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {exhibition.featured ? 'Featured' : 'Current'}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4 leading-relaxed">
          {exhibition.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{exhibition.startDate} - {exhibition.endDate}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{exhibition.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            <span>{exhibition.pieces} pieces</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            <span>10am - 6pm</span>
          </div>
        </div>
        
        {!isPast && (
          <div className="flex gap-3">
            <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
              View Details
            </button>
            <button className="flex-1 border border-amber-600 text-amber-600 hover:bg-amber-50 py-2 px-4 rounded-lg font-semibold transition-colors">
              Book Tour
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-serif font-bold text-gray-900 mb-6"
            >
              Exhibitions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Discover carefully curated exhibitions that showcase the finest examples of art, antiques, and jewelry from our collection and beyond.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Current Exhibitions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Current Exhibitions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Visit our gallery today to experience these exceptional exhibitions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {currentExhibitions.map((exhibition, index) => (
              <ExhibitionCard key={exhibition.id} exhibition={exhibition} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Exhibitions */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Upcoming Exhibitions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mark your calendar for these exciting upcoming exhibitions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingExhibitions.map((exhibition, index) => (
              <ExhibitionCard key={exhibition.id} exhibition={exhibition} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Past Exhibitions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Past Exhibitions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our archive of previous exhibitions and their highlights
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pastExhibitions.map((exhibition, index) => (
              <ExhibitionCard key={exhibition.id} exhibition={exhibition} index={index} isPast={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Visit Information */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Visit Our Gallery</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-amber-400 mr-3" />
                  <span>123 Gallery Street, New York, NY 10001</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-amber-400 mr-3" />
                  <span>Monday - Friday: 10am - 6pm</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-amber-400 mr-3" />
                  <span>Saturday: 10am - 4pm</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-amber-400 mr-3" />
                  <span>Sunday: By appointment</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Private Tours</h2>
              <p className="text-lg mb-6 opacity-90">
                Schedule a private tour with one of our curators for a personalized experience 
                of our current exhibitions.
              </p>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Book a Tour
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Exhibitions;