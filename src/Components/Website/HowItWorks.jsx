import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Discover",
      description: "Browse events by category, location, or date. Use our smart filters to find exactly what you're looking for.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Save or Buy",
      description: "Start saving towards expensive events or buy tickets instantly. Track your progress in your personal dashboard.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Enjoy",
      description: "Get your tickets delivered instantly and enjoy amazing events. Rate and share your experiences.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">
            How It Works
          </h2>
          <p className="text-lg text-secondary">
            Get started in just 3 simple steps
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between relative">
              {/* Curved Connecting Lines */}
              <div className="absolute inset-0 pointer-events-none">
                {/* First curved line - from step 1 to step 2 */}
                <svg 
                  className="absolute top-8 left-0 w-full h-20" 
                  viewBox="0 0 1000 80" 
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M 200 40 Q 350 15 500 40" 
                    stroke="#6300FE" 
                    strokeWidth="3" 
                    strokeDasharray="10,10" 
                    opacity="0.5"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                
                {/* Second curved line - from step 2 to step 3 */}
                <svg 
                  className="absolute top-8 left-0 w-full h-20" 
                  viewBox="0 0 1000 80" 
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M 500 40 Q 650 65 800 40" 
                    stroke="#6300FE" 
                    strokeWidth="3" 
                    strokeDasharray="10,10" 
                    opacity="0.5"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              {/* Steps */}
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center text-center max-w-xs relative z-10">
                  {/* Icon Circle */}
                  <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-dark mb-4">
                    {step.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-12">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center text-center relative">
                {/* Connecting Line for Mobile */}
                {index < steps.length - 1 && (
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-dashed bg-primary opacity-30"></div>
                )}
                
                {/* Icon Circle */}
                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  {step.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-dark mb-4">
                  {step.title}
                </h3>
                <p className="text-secondary leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="bg-primary hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;