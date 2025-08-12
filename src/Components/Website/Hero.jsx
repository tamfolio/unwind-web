import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="hero-bg h-auto relative overflow-hidden px-[168px] w-full">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-16 h-16 bg-purple-100 rounded-full opacity-60"></div>
      <div className="absolute top-40 right-40 w-8 h-8 bg-purple-200 rounded-full opacity-80"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-pink-100 rounded-full opacity-60"></div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center justify-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-offwhite rounded-full px-4 py-2 shadow-sm">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-sm font-medium text-primary">
                Events You Love
              </span>
            </div>

            {/* Main Heading */}
            <div className="">
              <h1 className="text-5xl lg:text-6xl font-bold text-dark leading-tight">
                Discover.
              </h1>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-dark">Save.</span>
                <span className="text-linear">Unwind.</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-grey leading-relaxed max-w-lg">
              The ultimate event ticketing platform that makes discovering
              amazing events and purchasing tickets as easy as a few taps. Save
              towards your dream events and never miss out again.
            </p>

            {/* CTA Button */}
            <Link to='/discover-events'>
              <button className="bg-primary hover:bg-purple-700 text-white font-semibold px-16 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Discover Events
              </button>
            </Link>

            {/* Stats */}
            <div className="flex space-x-12 pt-8">
              <div>
                <div className="text-3xl font-bold text-gray-900">3000+</div>
                <div className="text-sm text-gray-600">Events Hosted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">200+</div>
                <div className="text-sm text-gray-600">Verified Organizers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">50,000+</div>
                <div className="text-sm text-gray-600">Tickets Sold</div>
              </div>
            </div>
          </div>

          <div>
            <img src="/assets/hero-img.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
