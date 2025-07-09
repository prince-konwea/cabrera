import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, Mail } from 'lucide-react';

const Insights = () => {
  const featuredPost = {
    id: 1,
    title: "The Genius of Van Gogh's Starry Night",
    excerpt: "Exploring the revolutionary techniques and emotional depth behind van Gogh's most famous masterpiece and its enduring influence.",
    author: "Dr. James Morrison",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Art Analysis"
  };

  const posts = [
    {
      id: 2,
      title: "Decoding the Mona Lisa's Smile",
      excerpt: "How Leonardo da Vinci's masterpiece continues to captivate and mystify viewers centuries after its creation.",
      author: "Elena Heritage",
      date: "March 10, 2024",
      readTime: "6 min read",
      image: "https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Renaissance Art"
    },
    {
      id: 3,
      title: "Van Gogh's Brushwork Techniques",
      excerpt: "Essential knowledge for collectors interested in understanding van Gogh's unique painting methods and style.",
      author: "Sophie Chen",
      date: "March 5, 2024",
      readTime: "10 min read",
      image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Technique"
    },
    {
      id: 4,
      title: "Leonardo's Scientific Approach to Art",
      excerpt: "Professional insights into how da Vinci's scientific mind influenced his artistic masterpieces.",
      author: "Marcus Heritage III",
      date: "February 28, 2024",
      readTime: "7 min read",
      image: "https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Renaissance"
    },
    {
      id: 5,
      title: "Post-Impressionism's Lasting Impact",
      excerpt: "Understanding how van Gogh and his contemporaries revolutionized the art world and influenced modern painting.",
      author: "Dr. James Morrison",
      date: "February 20, 2024",
      readTime: "9 min read",
      image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Art History"
    },
    {
      id: 6,
      title: "Renaissance Masters: A Collector's Guide",
      excerpt: "Essential advice for new collectors interested in Renaissance art and the works of masters like da Vinci.",
      author: "Elena Heritage",
      date: "February 15, 2024",
      readTime: "12 min read",
      image: "https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Collecting"
    }
  ];

  const categories = [
    { name: "All", count: 25 },
    { name: "Art Analysis", count: 8 },
    { name: "Renaissance Art", count: 6 },
    { name: "Technique", count: 5 },
    { name: "Art History", count: 4 },
    { name: "Collecting", count: 2 }
  ];

  const PostCard = ({ post, index, featured = false }: { post: any, index: number, featured?: boolean }) => (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full object-cover ${featured ? 'h-80' : 'h-48'}`}
        />
        <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {post.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className={`font-serif font-bold text-gray-900 mb-3 hover:text-amber-600 transition-colors ${
          featured ? 'text-2xl' : 'text-xl'
        }`}>
          {post.title}
        </h3>
        
        <p className={`text-gray-600 mb-4 leading-relaxed ${featured ? 'text-lg' : ''}`}>
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <button className="flex items-center text-amber-600 hover:text-amber-700 font-semibold">
            Read More
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.article>
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
              Insights & Stories
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Expert insights, market analysis, and stories from the world of fine art, antiques, and luxury jewelry.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Featured Post */}
            <section className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Featured Article</h2>
                <div className="w-20 h-1 bg-amber-600"></div>
              </div>
              <PostCard post={featuredPost} index={0} featured={true} />
            </section>

            {/* Recent Posts */}
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Recent Articles</h2>
                <div className="w-20 h-1 bg-amber-600"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gray-900 rounded-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Stay Informed</h3>
                <p className="text-gray-300 mb-4">
                  Get our latest insights and market analysis delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Featured Authors */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Featured Authors</h3>
                <div className="space-y-4">
                  {[
                    { name: "Dr. James Morrison", role: "Head of Authentication", posts: 12 },
                    { name: "Elena Heritage", role: "Owner & Chief Curator", posts: 8 },
                    { name: "Sophie Chen", role: "Jewelry Specialist", posts: 6 }
                  ].map((author, index) => (
                    <motion.div
                      key={author.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-amber-600 font-semibold text-sm">
                          {author.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{author.name}</p>
                        <p className="text-gray-600 text-xs">{author.role}</p>
                        <p className="text-gray-500 text-xs">{author.posts} articles</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;