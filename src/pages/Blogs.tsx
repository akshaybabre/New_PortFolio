import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add useNavigate
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

gsap.registerPlugin(ScrollTrigger);

export const Blogs = () => {
  const blogsRef = useRef<HTMLDivElement>(null);
  const [selectedTag, setSelectedTag] = useState('All');
  const navigate = useNavigate(); // Initialize useNavigate

  const allTags = ['All', ...Array.from(new Set(portfolioConfig.blogs.flatMap(blog => blog.tags)))];
  const filteredBlogs = selectedTag === 'All' 
    ? portfolioConfig.blogs 
    : portfolioConfig.blogs.filter(blog => blog.tags.includes(selectedTag));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.blog-card').forEach((card: any, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, rotateY: 15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%'
            }
          }
        );
      });

      gsap.utils.toArray('.featured-blog').forEach((card: any) => {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%'
            }
          }
        );
      });
    }, blogsRef);

    return () => ctx.revert();
  }, [filteredBlogs]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to handle blog card click
  const handleBlogClick = (id: number) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <div ref={blogsRef} className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Blog & Insights
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Sharing thoughts, experiences, and insights about technology, development, and innovation
          </p>
        </div>

        {/* Featured Blog */}
        {portfolioConfig.blogs.find(blog => blog.featured) && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Featured Article
            </h2>
            {portfolioConfig.blogs
              .filter(blog => blog.featured)
              .map((blog) => (
                <div
                  key={blog.id}
                  className="featured-blog group bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
                  onClick={() => handleBlogClick(blog.id)} // Add onClick
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-transparent"></div>
                    </div>
                    
                    <div className="p-12 text-white relative">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 to-purple-300"></div>
                      
                      <div className="mb-6">
                        <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                          Featured
                        </span>
                        <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                          {blog.title}
                        </h3>
                        <p className="text-purple-100 text-lg leading-relaxed mb-6">
                          {blog.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center space-x-6 mb-8 text-purple-200">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{formatDate(blog.publishedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{blog.readTime}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {blog.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button className="group/btn bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold hover:bg-purple-100 hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                        <span>Read Article</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Tag Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 mr-4">
            <Tag className="w-5 h-5" />
          </div>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 shadow-md'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs
            .filter(blog => !blog.featured)
            .map((blog) => (
              <div
                key={blog.id}
                className="blog-card group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => handleBlogClick(blog.id)} // Add onClick
              >
                <div className="relative overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-medium">
                      {blog.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(blog.publishedAt)}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="group/btn w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try selecting a different tag to see more articles.
            </p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Get notified when I publish new articles about technology, development tips, and industry insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold hover:bg-purple-100 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};