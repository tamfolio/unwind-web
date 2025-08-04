import React from 'react'
import Navbar from '../../Components/Website/Navbar'
import HeroSection from '../../Components/Website/Hero'
import Partners from '../../Components/Website/Partners'
import DiscoverEvents from '../../Components/Website/DiscoverEvents'
import CustomerBenefits from '../../Components/Website/CustomerBenefits'
import HowItWorks from '../../Components/Website/HowItWorks'
import Trusted from '../../Components/Website/Trusted'
import UserFeedback from '../../Components/Website/UserFeedback'
import Security from '../../Components/Website/Security'
import StayInLoop from '../../Components/Website/StayInLoop'
import Footer from '../../Components/Website/Footer'

function LandingPage() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <Partners/>
      <DiscoverEvents/>
      <CustomerBenefits/>
      <HowItWorks/>
      <Trusted/>
      <UserFeedback/>
      <Security/>
      <StayInLoop/>
      <Footer/>
    </div>
  )
}

export default LandingPage
