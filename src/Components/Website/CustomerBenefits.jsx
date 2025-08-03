import React from 'react';

const CustomerBenefits = () => {
  const attendeeBenefits = [
    "Save towards events with our unique savings feature",
    "Track all your tickets in one beautiful dashboard",
    "Discover events based on your interests",
    "Get notifications for price drops and new events",
    "Secure and instant ticket delivery"
  ];

  const organizerBenefits = [
    "Easy event creation and management",
    "Real-time analytics and insights",
    "Instant payouts after events",
    "Built-in marketing and promotion tools",
    "24/7 customer support"
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">
            Built for Everyone
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Simple, powerful, and designed for everyone — from event lovers to 
            event creators
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* For Attendees */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            {/* Icon */}
            <div className="w-16 h-16 bg-[#F7F5FA] rounded-full flex items-center justify-center mb-6">
                <img src="/assets/frame.png" alt="" />
            </div>

            <h3 className="text-2xl font-bold text-dark mb-4">For Attendees</h3>
            <p className="text-secondary mb-8">
              Discover amazing events, save towards tickets, and never miss out on 
              experiences you love.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {attendeeBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="bg-primary hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 w-full lg:w-auto">
              Join as Attendee
            </button>
          </div>

          {/* For Organizers */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            {/* Icon */}
            <div className="w-16 h-16 bg-[#F7F5FA] rounded-full flex items-center justify-center mb-6">
              <img src="/assets/favorite-chart.png" alt="" />
            </div>

            <h3 className="text-2xl font-bold text-dark mb-4">For Organizers</h3>
            <p className="text-secondary mb-8">
              Discover amazing events, save towards tickets, and never miss out on 
              experiences you love.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {organizerBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="bg-primary hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 w-full lg:w-auto">
              Start Organizing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBenefits;