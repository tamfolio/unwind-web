// Components/Website/WebsiteLayout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import StayInLoop from '../../Components/Website/StayInLoop'
import Footer from '../../Components/Website/Footer'
import Navbar from '../../Components/Website/Navbar'


function WebsiteLayout() {
  return (
    <div>
      <Navbar />
      <main>
        {/* This is where the page content will be rendered */}
        <Outlet />
      </main>
      <StayInLoop />
      <Footer />
    </div>
  )
}

export default WebsiteLayout