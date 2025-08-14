import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation();
  
  return (
    <div className='px-[72px] py-6 flex items-center justify-between'>
        <Link to="/">
          <img src="/assets/logo.png" alt="" />
        </Link>
        <div className='flex gap-8 text-[14px] text-[#9487A8] font-medium'>
            <Link 
              to='/' 
              className={location.pathname === '/' ? 'text-primary' : ''}
            >
              Home
            </Link>
            <Link 
              to='/discover-events'
              className={location.pathname.includes('/discover-events') ? 'text-primary' : ''}
            >
              Discover Events
            </Link>
            <span>How It Works</span>
            <Link 
              to='/pricing'
              className={location.pathname.includes('/pricing') ? 'text-primary' : ''}
            >
              Pricing
            </Link>
            <Link 
              to='/blog'
              className={location.pathname.includes('/blog') ? 'text-primary' : ''}
            >
              Blog
            </Link>
            <Link 
              to='/Contact-us'
              className={location.pathname.includes('/Contact-us') ? 'text-primary' : ''}
            >
              Contact Us
            </Link>
        </div>
        <div className='flex gap-8'>
            <span className='text-primary border-[1px] border-solid border-primary px-[14px] py-[10px] rounded-[8px] text-[14px] font-medium cursor-pointer'>Sign In</span>
            <span className='text-white border-[1px] bg-primary border-solid border-primary px-[14px] py-[10px] rounded-[8px] text-[14px] font-medium cursor-pointer'>Sign Up</span>
        </div>
    </div>
  )
}

export default Navbar