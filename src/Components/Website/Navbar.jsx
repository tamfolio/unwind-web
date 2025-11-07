import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <>
      {/* Desktop Navbar */}
      <div className='hidden lg:flex px-[72px] py-6 items-center justify-between'>
        <Link to="/">
          <img src="/assets/logo.png" alt="Unwind Logo" />
        </Link>
        
        <div className='flex gap-8 text-[14px] text-[#9487A8] font-medium'>
          <Link 
            to='/' 
            className={location.pathname === '/' ? 'text-primary' : 'hover:text-primary transition-colors'}
          >
            Home
          </Link>
          <Link 
            to='/discover-events'
            className={location.pathname.includes('/discover-events') ? 'text-primary' : 'hover:text-primary transition-colors'}
          >
            Discover Events
          </Link>
          <Link 
            to='/how-it-works'
            className={location.pathname.includes('/how-it-works') ? 'text-primary' : 'hover:text-primary transition-colors'}
          >
            How It Works
          </Link>
          <Link 
            to='/pricing'
            className={location.pathname.includes('/pricing') ? 'text-primary' : 'hover:text-primary transition-colors'}
          >
            Pricing
          </Link>
          <Link 
            to='/blog'
            className={location.pathname.includes('/blog') ? 'text-primary' : 'hover:text-primary transition-colors'}
          >
            Blog
          </Link>
          <Link 
            to='/Contact-us'
            className={location.pathname.includes('/Contact-us') ? 'text-primary' : 'hover:text-primary transition-colors'}
          >
            Contact Us
          </Link>
        </div>
        
        <div className='flex gap-8'>
          <Link 
            to='/sign-in' 
            className='text-primary border-[1px] border-solid border-primary px-[14px] py-[10px] rounded-[8px] text-[14px] font-medium cursor-pointer hover:bg-primary hover:text-white transition-all duration-200'
          >
            Sign In
          </Link>
          <Link 
            to='/sign-up' 
            className='text-white border-[1px] bg-primary border-solid border-primary px-[14px] py-[10px] rounded-[8px] text-[14px] font-medium cursor-pointer hover:bg-purple-700 transition-colors duration-200'
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className='lg:hidden flex items-center justify-between px-4 py-4 bg-white relative z-50'>
        <Link to="/">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">U</span>
            <span className="text-2xl font-bold text-dark">nwind</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {/* Sign Up button visible on mobile header */}
          <Link 
            to='/sign-up' 
            className='text-primary text-sm font-medium'
          >
            Sign Up
          </Link>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            className='p-2 focus:outline-none'
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Matches your design exactly */}
      {isMobileMenuOpen && (
        <div className='lg:hidden fixed inset-0 bg-white z-50 flex flex-col'>
          {/* Mobile menu header */}
          <div className='flex items-center justify-between px-4 py-4 border-b border-gray-100'>
            <Link to="/" onClick={closeMobileMenu}>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary">U</span>
                <span className="text-2xl font-bold text-dark">nwind</span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link 
                to='/sign-up' 
                className='text-primary text-sm font-medium'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
              <button 
                onClick={closeMobileMenu}
                className='p-2 focus:outline-none'
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Menu - Matches your design layout */}
          <div className='flex-1 px-6 py-8'>
            <nav className='space-y-8'>
              <Link 
                to='/' 
                className={`block text-lg font-medium ${
                  location.pathname === '/' ? 'text-primary' : 'text-gray-700'
                }`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              
              <Link 
                to='/discover-events'
                className={`block text-lg font-medium ${
                  location.pathname.includes('/discover-events') ? 'text-primary' : 'text-gray-700'
                }`}
                onClick={closeMobileMenu}
              >
                Discover Events
              </Link>
              
              <Link 
                to='/how-it-works'
                className={`block text-lg font-medium ${
                  location.pathname.includes('/how-it-works') ? 'text-primary' : 'text-gray-700'
                }`}
                onClick={closeMobileMenu}
              >
                How It Works
              </Link>
              
              <Link 
                to='/pricing'
                className={`block text-lg font-medium ${
                  location.pathname.includes('/pricing') ? 'text-primary' : 'text-gray-700'
                }`}
                onClick={closeMobileMenu}
              >
                Pricing
              </Link>
              
              <Link 
                to='/blog'
                className={`block text-lg font-medium ${
                  location.pathname.includes('/blog') ? 'text-primary' : 'text-gray-700'
                }`}
                onClick={closeMobileMenu}
              >
                Blog
              </Link>
              
              <Link 
                to='/Contact-us'
                className={`block text-lg font-medium ${
                  location.pathname.includes('/Contact-us') ? 'text-primary' : 'text-gray-700'
                }`}
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Bottom Action Buttons - Matches your design exactly */}
          <div className='px-6 pb-8 space-y-4'>
            <Link 
              to='/sign-up'
              className='block w-full text-center bg-primary text-white py-4 px-4 rounded-lg text-base font-semibold'
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
            
            <Link 
              to='/sign-in'
              className='block w-full text-center border-2 border-primary text-primary py-4 px-4 rounded-lg text-base font-semibold'
              onClick={closeMobileMenu}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div 
          className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40'
          onClick={closeMobileMenu}
        />
      )}
    </>
  )
}

export default Navbar