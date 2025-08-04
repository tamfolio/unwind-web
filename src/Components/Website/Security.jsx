import React from 'react';

function Security() {
  const securityFeatures = [
    {
      id: 1,
      title: "SSL Encrypted",
      description: "All data transmission is protected with 256-bit SSL encryption",
      icon: '/assets/frame.svg' 
    },
    {
      id: 2,
      title: "24/7 Monitoring",
      description: "Our systems are monitored around the clock for any security threats",
      icon: '/assets/clock.png' 
    },
    {
      id: 3,
      title: "Verified Organizers",
      description: "All event organizers go through our verification process",
      icon: '/assets/profile-tick.svg' 
    }
  ];

  return (
    <div className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Security is Our Priority
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We use industry-leading security measures to protect your data and payments
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {securityFeatures.map((feature) => (
            <div key={feature.id} className="text-center">
              {/* Icon Circle */}
              <div className="w-15 h-15 bg-[#A7FAC6F0] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <img src={feature.icon} alt="" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Optional Trust Badges or Additional Info */}
        {/* <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Bank-level Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-0.257-.257A6 6 0 1118 8zM10 2a1 1 0 011 1v1a3 3 0 013 3v1a1 1 0 11-2 0V7a1 1 0 00-1-1H9a1 1 0 00-1 1v1a1 1 0 11-2 0V7a3 3 0 013-3V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">PCI DSS Certified</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Security;