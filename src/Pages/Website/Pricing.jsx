import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    { icon: '/assets/flash.png', title: 'Lightning Fast Setup', description: 'Create any event in just a few clicks, it takes less than 2 minutes' },
    { icon: '/assets/card-pos.svg', title: 'Instant Payouts', description: 'Get paid immediately after each transaction with no hidden fees' },
    { icon: '/assets/status-up.png', title: 'Real-time Analytics', description: 'Track sales, attendees, and performance in real-time dashboard' },
    { icon: '/assets/fraud.svg', title: 'Fraud Protection', description: 'Advanced security measures protect you and your attendees' },
    { icon: '/assets/profile-2user.png', title: 'Attendee Management', description: 'Complete tools for managing registrations and check-ins' },
    { icon: '/assets/message-question.png', title: '24/7 Support', description: 'Get help whenever you need it from our expert team' }
  ];

  const includedFeatures = [
    'Unlimited ticket sales and event creation',
    'Automated email confirmations',
    'Custom event landing pages',
    'Discount codes and promotional tools',
    'Refund management system',
    'International ticket scanning',
    'Multiple or monthly fees',
    'Quick setup integration',
    'Social media integration'
  ];

  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers. Payments are processed securely through our trusted payment partners.'
    },
    {
      question: 'Do you provide marketing support?',
      answer: 'Yes, we help promote your events through our platform, social media channels, and email marketing to our user base.'
    },
    {
      question: 'When do I get paid?',
      answer: 'Funds are usually transferred to your account within 24 hours after ticket sales. You can track all payments in your organizer dashboard.'
    },
    {
      question: 'Are there any setup fees?',
      answer: 'No setup fees! Simply pay our service fee when you successfully sell tickets. There are no monthly subscriptions or hidden costs.'
    },
    {
      question: 'Do you provide marketing support?',
      answer: 'Yes, we help promote your events through our platform, social media channels, and email marketing to our user base.'
    },
    {
      question: 'Can I customize my event page?',
      answer: 'Absolutely! You can fully customize your event page with your branding, images and detailed descriptions.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative text-white py-20 px-4 overflow-hidden" style={{background: 'linear-gradient(91.66deg, #C598FF 0.26%, #9747FF 98.96%)'}}>
        {/* Background Images */}
        <img 
          src="/assets/pricing1.png" 
          alt="" 
          className="absolute bottom-0 left-0 w-1/3 max-w-md opacity-70"
        />
        <img 
          src="/assets/pricing2.png" 
          alt="" 
          className="absolute top-0 right-0 w-1/3 max-w-md opacity-70"
        />
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Simple. Transparent. Powerful.
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
          Everything you need to create, manage, and grow successful events. One platform, one fee, unlimited possibilities.
          </p>
          <div className='w-full flex items-center justify-center'>
            <div className="mb-8 bg-white/12 w-[316px] py-10 rounded-xl">
              <div className="text-6xl md:text-8xl font-bold mb-4">2.5%</div>
              <p className='mb-4'>Per Ticket Sold</p>
              <div className="bg-white backdrop-blur-sm rounded-full px-6 py-2 inline-block">
                <span className="text-sm font-bold text-primary">No setup fees • No monthly costs</span>
              </div>
            </div>
          </div>
          
          <button className="bg-[#6300FE] hover:bg-purple-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Start Selling Tickets Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600">
              From event creation to post-event analysis, we've got you covered with
              professional-grade tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center">
                <div className="text-4xl mb-4 w-[80px] h-[80px] bg-[#F7F5FA] rounded-full flex items-center justify-center">
                  <img src={feature.icon} alt="" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Included Section */}
      <div className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Every Feature Included
            </h2>
            <p className="text-lg text-gray-600">
              No hidden costs and no tiered plans - get everything in one flat fee.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {includedFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#22C55E] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Event Organizers Worldwide
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of organizers who trust Unwind to power their events.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">8K+</div>
              <div className="text-purple-200">Events Created</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">3000+</div>
              <div className="text-purple-200">Active Organizers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-purple-200">Cities Worldwide</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-purple-200">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Create Your Next Event?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of successful event organizers. No contracts. No
            setup fees. Start today.
          </p>
          
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Create Your First Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pricing;