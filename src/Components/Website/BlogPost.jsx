import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

const BlogPost = () => {
  // For demo purposes, we'll use ID 1. In a real app, you'd get this from useParams()
  const id = 1;
  
  // Sample blog data - in a real app, you'd fetch this based on the ID
  const blogPosts = {
    1: {
      title: "10 Essential Tips for Planning Your First Event",
      category: "Event Planning",
      readTime: "8 min read",
      date: "January 15th",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&fit=crop",
      content: {
        subtitle: "Top Event Management Trends Shaping 2024",
        intro: "In recent years, the event management industry has witnessed unprecedented growth, fueled by increasing audience preferences, and a renewed focus on immersive event experiences. As we advance through 2024, event professionals are seeing digital y major to their successful events, marking the beginning of a vibrant era that redefines the traditional event managing experience.",
        sections: [
          {
            title: "1. Hybrid Events Continue to Dominate",
            content: "The pandemic fundamentally shifted event experiences—from moving from being a pandemic requirement to a long-term strategic choice. In 2024, hybrid is no longer optional, it's expected. Organisers are leveraging advanced event tech platforms to provide seamless interactions between remote attendees and in-person participants. Hybrid events can also enable specific networking opportunities like in their business objective among the target audiences or reach broader audiences."
          },
          {
            title: "2. AI-Powered Personalization",
            content: "Artificial intelligence is revolutionizing how event organisers create tailored event experiences. Event platforms now use AI to analyse user behavior, preferences, and engagement patterns to serve personalised content recommendations, suggest relevant sessions, and even facilitate smart networking by matching attendees with shared interests. Chatbots powered by AI are also improving attendee support, answering FAQs, and guiding users through the event experience to help reduce the overhead costs of live staff for each participant."
          },
          {
            title: "3. Sustainability Takes Center Stage",
            content: "Event sustainability is not a trend but a responsibility that's shaping the future of event planning. Organisers are actively reducing their environmental impact by adopting eco-friendly practices such as digital event materials, sustainable transportation options, zero waste initiatives. Event organisers are also optimising for venues and transport suppliers supporting and promoting business practices that can improve brand reputation and attendee loyalty."
          },
          {
            title: "4. Enhanced Data Analytics",
            content: "In today's digital-first event landscape, data is a critical asset. Organisers now have access to a wealth of real-time insights—from registration behavior and session attendance to engagement levels and post-event feedback. These analytics help optimise everything from marketing strategies to session content and speaker selection. The ability to measure ROI accurately and make data-driven decisions in real-time will continue to significantly improve the event experience year after year."
          }
        ],
        conclusion: "The future of event management is more dynamic, data-driven, and personalized than ever before. With hybrid formats becoming the norm, AI shaping the user experience, sustainability influencing every decision, and data driving strategy, 2024 is a pivotal year for event professionals. Staying ahead of these trends is essential for delivering memorable, impactful events that resonate with modern audiences."
      }
    },
    2: {
      title: "How Technology is Changing Event Management",
      category: "Technology", 
      readTime: "6 min read",
      date: "January 10th",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
      content: {
        subtitle: "The Digital Revolution in Events",
        intro: "The events industry has undergone a dramatic transformation in recent years, largely driven by technological innovation. From AI-powered recommendations to contactless experiences, technology is reshaping how we plan, execute, and attend events.",
        sections: [
          {
            title: "1. Event Management Platforms",
            content: "Modern event management platforms have evolved far beyond simple registration systems. Today's solutions offer comprehensive suites that handle everything from attendee management to real-time analytics, creating more efficient workflows and better attendee experiences."
          },
          {
            title: "2. Mobile-First Experiences", 
            content: "Mobile apps have become essential for modern events. They provide personalized schedules, networking opportunities, real-time updates, and interactive features that keep attendees engaged throughout the event experience."
          }
        ],
        conclusion: "As we look ahead, emerging technologies will continue to transform the industry. Event professionals who embrace these changes will be best positioned for success in the digital age."
      }
    }
  };

  // Related articles (excluding current post)
  const relatedArticles = [
    {
      id: 2,
      title: "How Technology is Changing Event Management", 
      excerpt: "From AI-powered recommendations to contactless check-ins, discover how modern technology is transforming the events industry.",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "The Psychology Behind Successful Event Marketing",
      excerpt: "Understanding what motivates people to attend events and how to craft compelling marketing messages that convert.",
      category: "Marketing", 
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Post-Pandemic Event Trends: What's Here to Stay",
      excerpt: "Analyzing the lasting changes in event planning and attendee expectations following the global pandemic.",
      category: "Industry",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=250&fit=crop"
    }
  ].filter(article => article.id != id);

  const post = blogPosts[id];

  const handleBackClick = () => {
    // In a real app, this would use navigate('/blog')
    console.log('Navigate back to /blog');
    alert('This would navigate back to the blog page');
  };

  const handleReadMore = (postId) => {
    // In a real app, this would use navigate(`/blog/${postId}`)
    console.log(`Navigate to blog/${postId}`);
    alert(`This would navigate to blog post ${postId}`);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <button 
            onClick={handleBackClick}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button 
            onClick={handleBackClick}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Category Tag */}
          <div className="mb-6">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm font-medium">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center text-gray-500 text-sm mb-8">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>

          {/* Hero Image */}
          <div className="mb-12">
            <img 
              src={post.image}
              alt={post.title}
              className="w-full h-80 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            {/* Subtitle */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {post.content.subtitle}
            </h2>

            {/* Intro */}
            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              {post.content.intro}
            </p>

            {/* Content Sections */}
            {post.content.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Conclusion */}
            <div className="mt-12 p-6 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Conclusion</h3>
              <p className="text-gray-700 leading-relaxed">
                {post.content.conclusion}
              </p>
            </div>
          </article>
        </div>
      </div>

      {/* Related Articles */}
      <div className="bg-white py-16 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Related Articles
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-6">
                  <div className="mb-3">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 text-gray-900 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <button 
                    onClick={() => handleReadMore(article.id)}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors flex items-center"
                  >
                    Read Article →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default BlogPost;