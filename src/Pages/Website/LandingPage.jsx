import React from 'react'
import Navbar from '../../Components/Website/Navbar'
import HeroSection from '../../Components/Website/Hero'
import Partners from '../../Components/Website/Partners'
import DiscoverEvents from '../../Components/Website/DiscoverEvents'
import CustomerBenefits from '../../Components/Website/CustomerBenefits'
import HowItWorks from '../../Components/Website/HowItWorks'

function LandingPage() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <Partners/>
      <DiscoverEvents/>
      <CustomerBenefits/>
      <HowItWorks/>
    </div>
  )
}

export default LandingPage
