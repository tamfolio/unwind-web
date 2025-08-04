import React from 'react';

function Trusted() {
  const stats = [
    {
      number: "8K+",
      label: "Active Users"
    },
    {
      number: "3000+",
      label: "Events Listed"
    },
    {
      number: "200+",
      label: "Verified Organizers"
    },
    {
      number: "99.9%",
      label: "Uptime"
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 py-20 px-4">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Event Lovers Worldwide
          </h2>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who have discovered their next favorite event 
            on Unwind
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-4">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  {stat.number}
                </h3>
                <p className="text-lg md:text-xl text-purple-100 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Optional decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/3 rounded-full blur-lg"></div>
      </div>
    </div>
  );
}

export default Trusted;