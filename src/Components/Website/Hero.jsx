import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="hero-bg h-auto relative overflow-hidden w-full">
      {/* Background decorative elements - hidden on mobile for cleaner design */}
      <div className="hidden lg:block absolute top-20 right-20 w-16 h-16 bg-purple-100 rounded-full opacity-60"></div>
      <div className="hidden lg:block absolute top-40 right-40 w-8 h-8 bg-purple-200 rounded-full opacity-80"></div>
      <div className="hidden lg:block absolute bottom-40 left-20 w-12 h-12 bg-pink-100 rounded-full opacity-60"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-[168px] py-8 sm:py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center justify-center">
          {/* Left Content */}
          <div className="order-first lg:order-first space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-offwhite rounded-full px-3 sm:px-4 py-2 shadow-sm">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-xs sm:text-sm font-medium text-primary">
                Events You Love
              </span>
            </div>

            {/* Main Heading - Mobile optimized */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark leading-tight">
                Discover.
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-dark">Save.</span>
                <span className="text-linear">Unwind.</span>
              </h1>
            </div>

            {/* Description - Mobile optimized */}
            <p className="text-base sm:text-lg text-grey leading-relaxed max-w-full lg:max-w-lg mx-auto lg:mx-0 px-2 sm:px-0">
              The ultimate event ticketing platform that makes discovering
              amazing events and purchasing tickets as easy as a few taps. Save
              towards your dream events and never miss out again.
            </p>

            {/* CTA Button - Mobile optimized */}
            <div className="pt-4">
              <Link to='/discover-events'>
                <button className="w-full sm:w-auto bg-primary hover:bg-purple-700 text-white font-semibold px-8 sm:px-12 lg:px-16 py-3 sm:py-3.5 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base">
                  Discover Events
                </button>
              </Link>
            </div>

            {/* Stats - Mobile optimized layout */}
            <div className="flex flex-row justify-center lg:justify-start space-x-6 sm:space-x-8 lg:space-x-12 pt-6 lg:pt-8">
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">3000+</div>
                <div className="text-xs sm:text-sm text-gray-600">Events Hosted</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">200+</div>
                <div className="text-xs sm:text-sm text-gray-600">Verified Organizers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">50,000+</div>
                <div className="text-xs sm:text-sm text-gray-600">Tickets Sold</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="order-last lg:order-last mt-8 lg:mt-0 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-full">
              <img 
                src="/assets/hero-img.png" 
                alt="Unwind Events Platform" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;