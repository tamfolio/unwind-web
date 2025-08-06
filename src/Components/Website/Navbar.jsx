import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='px-[72px] py-6 flex items-center justify-between'>
        <img src="/assets/logo.png" alt="" />
        <div className='flex gap-8 text-[14px] text-[#9487A8] font-medium'>
            <span className='text-primary'>Home</span>
            <Link to='/discover-events'>Discover Events</Link>
            <span>How It Works</span>
            <span>Pricing</span>
            <span>Blog</span>
            <span>Contact Us</span>
        </div>
        <div className='flex gap-8'>
            <span className='text-primary border-[1px] border-solid border-primary px-[14px] py-[10px] rounded-[8px] text-[14px] font-medium'>Sign In</span>
            <span className='text-white border-[1px] bg-primary border-solid border-primary px-[14px] py-[10px] rounded-[8px] text-[14px] font-medium'>Sign Up</span>
        </div>
    </div>
  )
}

export default Navbar
