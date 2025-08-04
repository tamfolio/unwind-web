import React from 'react';

function Footer() {
  const quickLinks = [
    { name: 'Discover Events', href: '/events' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Refund Policy', href: '/refund' }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: '#',
      icon: 'assets/Frame (2).png'
    },
    {
      name: 'Facebook',
      href: '#',
      icon: 'assets/Frame (2).png'
    },
    {
      name: 'Instagram',
      href: '#',
      icon: 'assets/Frame (2).png'
    },
    {
      name: 'Twitter',
      href: '#',
      icon: 'assets/Frame (2).png'
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
                <img src="/assets/logo2.png" alt="" />
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
                  {social.icon}
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
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
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
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
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