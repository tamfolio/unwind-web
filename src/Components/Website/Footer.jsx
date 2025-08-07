import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = () => {
    scrollToTop();
  };
  const quickLinks = [
    { name: 'Discover Events', href: '/discover-events' }, // Updated to match your route
    { name: 'How It Works', href: '/how-it-works' }, // Keep as placeholder
    { name: 'Pricing', href: '/pricing' }, // Keep as placeholder
    { name: 'Blog', href: '/blog' }, // Updated to match your route
    { name: 'Contact Us', href: '/contact' }, // Keep as placeholder
    { name: 'FAQ', href: '/faq' } // Keep as placeholder
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' }, // Keep as placeholder
    { name: 'Terms & Conditions', href: '/terms' }, // Keep as placeholder
    { name: 'Refund Policy', href: '/refund' } // Keep as placeholder
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: '#',
      icon: '/assets/Frame (2).png'
    },
    {
      name: 'Facebook', 
      href: '#',
      icon: '/assets/Frame (2).png'
    },
    {
      name: 'Instagram',
      href: '#',
      icon: '/assets/Frame (2).png'
    },
    {
      name: 'Twitter',
      href: '#',
      icon: '/assets/Frame (2).png'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="w-full mx-auto px-16 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-6">
              <Link to="/" onClick={handleLinkClick}>
                <img src="/assets/logo2.png" alt="Unwind Logo" />
              </Link>
            </div>
            
            {/* Description */}
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
              The ultimate event ticketing platform that connects event organizers 
              with attendees, making event discovery and ticket purchasing 
              seamless and enjoyable.
            </p>

            {/* Social Links */}
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-white hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  <img src={social.icon} alt={social.name} className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {/* Use Link component for routes that exist, regular anchor for placeholders */}
                  {link.href === '/discover-events' || link.href === '/blog' ? (
                    <Link
                      to={link.href}
                      onClick={handleLinkClick}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <span className="text-gray-500 cursor-not-allowed">
                      {link.name} (Coming Soon)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <span className="text-gray-500 cursor-not-allowed">
                    {link.name} (Coming Soon)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Unwind. All rights reserved. Built with{' '}
              <span className="text-red-500">❤️</span>{' '}
              for event lovers everywhere.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;