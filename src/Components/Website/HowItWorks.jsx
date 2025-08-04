import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Discover",
      description:
        "Browse events by category, location, or date. Use our smart filters to find exactly what you're looking for.",
      icon: "/assets/search-favorite.svg",
    },
    {
      id: 2,
      title: "Save or Buy",
      description:
        "Start saving towards expensive events or buy tickets instantly. Track your progress in your personal dashboard.",
      icon: "/assets/card-pos.png",
    },
    {
      id: 3,
      title: "Enjoy",
      description:
        "Get your tickets delivered instantly and enjoy amazing events. Rate and share your experiences.",
      icon: "/assets/ticket-star.png",
    },
  ];

  return (
    <div className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">How It Works</h2>
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
                <div
                  key={step.id}
                  className="flex flex-col items-center text-center max-w-xs relative z-10"
                >
                  {/* Icon Circle */}
                  <div className="w-16 h-16 bg-[#F7F5FA] text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <img src={step.icon} alt="" />
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
              <div
                key={step.id}
                className="flex flex-col items-center text-center relative"
              >
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
