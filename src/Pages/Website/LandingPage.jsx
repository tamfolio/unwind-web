// Pages/Website/LandingPage.jsx
import React from 'react'
import HeroSection from '../../Components/Website/Hero'
import Partners from '../../Components/Website/Partners'
import DiscoverEvents from '../../Components/Website/DiscoverEvents'
import CustomerBenefits from '../../Components/Website/CustomerBenefits'
import HowItWorks from '../../Components/Website/HowItWorks'
import Trusted from '../../Components/Website/Trusted'
import UserFeedback from '../../Components/Website/UserFeedback'
import Security from '../../Components/Website/Security'

function LandingPage() {
  return (
    <div>
      <HeroSection/>
      <Partners/>
      <DiscoverEvents/>
      <CustomerBenefits/>
      <HowItWorks/>
      <Trusted/>
      <UserFeedback/>
      <Security/>
    </div>
  )
}

export default LandingPage