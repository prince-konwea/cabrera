import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, Clock } from 'lucide-react';
import showroom from '../assets/showroom.jpeg';
import showroom1 from '../assets/showroom1.jpeg';
import showroom2 from '../assets/showroom2.jpeg';

const About = () => {
  const timeline = [
    {
      year: "1952",
      title: "Foundation",
      description: "Cabrera Gems & Artistry was established by Isabella Cabrera in New York City, beginning with a focus on European fine art and precious gems."
    },
    {
      year: "1967",
      title: "Expansion",
      description: "Added antiques and decorative arts to our collection, establishing relationships with European estates and auction houses."
    },
    {
      year: "1985",
      title: "Second Generation",
      description: "Isabella's daughter, Elena Cabrera, joined the gallery, bringing expertise in contemporary art and luxury jewelry design."
    },
    {
      year: "2010",
      title: "Global Reach",
      description: "Expanded internationally with partnerships in London, Paris, and Hong Kong, becoming a global destination for collectors."
    },
    {
      year: "2020",
      title: "Digital Innovation",
      description: "Launched our digital platform, bringing our curated collection to collectors worldwide during the pandemic."
    },
    {
      year: "2024",
      title: "Modern Era",
      description: "Today, we continue to set standards in authentication, curation, and collector services under the Cabrera family's third-generation leadership."
    }
  ];

  const team = [
    {
      name: "Elena Cabrera",
      role: "Owner & Chief Curator",
      image: showroom1,
      bio: "With over 40 years of experience, Elena has curated exhibitions for major museums and private collectors worldwide."
    },
    {
      name: "Dr. James Morrison",
      role: "Head of Authentication",
      image: showroom2,
      bio: "Former curator at the Metropolitan Museum of Art, Dr. Morrison leads our authentication and provenance research team."
    },
    {
      name: "Sophie Chen",
      role: "Jewelry Specialist",
      image: showroom1,
      bio: "A gemologist with expertise in vintage and contemporary luxury jewelry, specializing in European and Asian pieces."
    },
    {
      name: "Isabella Cabrera III",
      role: "Business Development",
      image: showroom2,
      bio: "Third-generation family member focused on expanding our global reach and digital presence."
    }
  ];

  const values = [
    {
      icon: Award,
      title: "Authenticity",
      description: "Every piece in our collection is rigorously authenticated by our team of experts and comes with a lifetime guarantee."
    },
    {
      icon: Users,
      title: "Expertise",
      description: "Our curators and specialists have decades of experience in their respective fields, ensuring the highest quality selections."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "We maintain relationships with collectors, estates, and institutions worldwide to source the finest pieces."
    },
    {
      icon: Clock,
      title: "Legacy",
      description: "Three generations of the Cabrera family have built a reputation for integrity and excellence in the art world."
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">
                Three Generations of Excellence
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Since 1952, Cabrera Gems & Artistry has been a trusted name in fine art, antiques, and luxury jewelry. 
                Our family-owned gallery has built lasting relationships with collectors, museums, and connoisseurs 
                worldwide, maintaining the highest standards of authenticity and expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-3xl font-bold text-amber-600">75+</div>
                  <div className="text-gray-600">Years of Experience</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl font-bold text-amber-600">10,000+</div>
                  <div className="text-gray-600">Pieces Curated</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl font-bold text-amber-600">50+</div>
                  <div className="text-gray-600">Countries Served</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src={showroom}
                alt="Cabrera Gems & Artistry storefront"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide our work and define our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Seven decades of growth, innovation, and dedication to the arts
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-amber-600" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-amber-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-600 rounded-full border-4 border-white shadow" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the experts who curate and authenticate our exceptional collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-stone-50 rounded-lg p-6 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-amber-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Ready to Start Your Collection?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our experts are here to help you find the perfect piece for your collection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              Schedule a Consultation
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-colors">
              View Our Collection
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;