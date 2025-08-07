import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();


  // Sample blog data - in a real app, this would come from an API or database
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Tips for Planning Your First Event",
      excerpt: "Starting your journey as an event organizer? Here are the key strategies that will help you create memorable experiences and avoid common pitfalls.",
      category: "Event Planning",
      readTime: "5 min read",
      date: "January 15th",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "How Technology is Changing Event Management",
      excerpt: "From AI-powered recommendations to contactless check-ins, discover how modern technology is transforming the events industry.",
      category: "Technology",
      readTime: "6 min read", 
      date: "January 10th",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "The Psychology Behind Successful Event Marketing",
      excerpt: "Understanding what motivates people to attend events and how to craft compelling marketing messages that convert.",
      category: "Marketing",
      readTime: "4 min read",
      date: "January 8th", 
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Post-Pandemic Event Trends: What's Here to Stay",
      excerpt: "Analyzing the lasting changes in event planning and attendee expectations following the global pandemic.",
      category: "Trends",
      readTime: "7 min read",
      date: "January 5th",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Building Community Through Virtual Events",
      excerpt: "Strategies for creating meaningful connections and fostering engagement in digital event spaces.",
      category: "Community",
      readTime: "5 min read",
      date: "January 3rd",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Sustainable Event Planning: Going Green",
      excerpt: "How to reduce environmental impact while creating impactful experiences that attendees will remember.",
      category: "Sustainability",
      readTime: "6 min read",
      date: "December 28th",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop"
    }
  ];

  const categories = ["All", "Event Planning", "Technology", "Marketing", "Trends", "Community", "Sustainability"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];
  const latestPosts = blogPosts.slice(1);

  const handleReadMore = (postId) => {
    // Navigate to individual blog post page
    navigate(`/blog/${postId}`);
  };

  const handleSearch = () => {
    // Search functionality - filters are already applied through searchQuery state
    console.log('Search executed with query:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-6">The Unwind Blog</h1>
          <p className="text-xl opacity-90 mb-12">
            Insights, tips, and stories from the world of events. Stay updated with the latest trends and best practices.
          </p>
          
          {/* Search Bar */}
          <div className="flex justify-center max-w-2xl mx-auto">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-l-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white text-lg"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-purple-800 hover:bg-purple-900 text-white px-8 py-4 rounded-r-lg font-semibold text-lg transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Featured Article */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Article</h2>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  {featuredPost.category}
                </span>
                <span className="text-gray-500 text-sm ml-4">{featuredPost.date}</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {featuredPost.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                <button 
                  onClick={() => handleReadMore(featuredPost.id)}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Read Article →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Latest Articles */}
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Latest Articles</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-xs ml-3">{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs">{post.readTime}</span>
                  <button 
                    onClick={() => handleReadMore(post.id)}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
                  >
                    Read Article →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
              className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div> 
    </div>
  );
};

export default BlogPage;