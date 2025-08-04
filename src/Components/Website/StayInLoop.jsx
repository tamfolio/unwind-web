import React, { useState } from 'react';

function StayInLoop() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      // Handle subscription logic here
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div 
      className="py-20 px-4"
      style={{
        background: 'linear-gradient(91.66deg, #C598FF 0.26%, #9747FF 98.96%)'
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay in the Loop
          </h2>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Get the latest updates on exciting events, exclusive deals, and platform 
            features delivered to your inbox.
          </p>
        </div>

        {/* Email Subscription Form */}
        <div className="max-w-2xl mx-auto">
          {!isSubscribed ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 text-gray-900 bg-white rounded-xl border-0 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="px-8 py-4 bg-primary  text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-white font-medium">
                  Thanks for subscribing! Check your inbox for confirmation.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Privacy Note */}
        {/* <div className="mt-8">
          <p className="text-sm text-purple-200">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div> */}

        {/* Optional decorative elements */}
        {/* <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none"></div> */}
      </div>
    </div>
  );
}

export default StayInLoop;