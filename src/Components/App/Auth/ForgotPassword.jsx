import React, { useState } from 'react'
import InitiateReset from './InitiateReset'
import ResetLinkSent from './ResetLinkSent'

function ForgotPassword() {
  const [currentPage, setCurrentPage] = useState(1);
  const [userEmail, setUserEmail] = useState("");

  // Handle successful email submission from InitiateReset
  const handleEmailSent = (email) => {
    setUserEmail(email);
    setCurrentPage(2); // Move to ResetLinkSent page
  };

  // Handle going back from ResetLinkSent to InitiateReset
  const handleBackToInitiate = () => {
    setCurrentPage(1);
  };

  // Handle resending email from ResetLinkSent
  const handleResendEmail = async () => {
    // You can implement resend logic here or go back to page 1
    setCurrentPage(1);
  };

  return (
    <div className='w-full'>
      {currentPage === 1 && (
        <InitiateReset onEmailSent={handleEmailSent} />
      )}
      {currentPage === 2 && (
        <ResetLinkSent 
          email={userEmail}
          onBack={handleBackToInitiate}
          onResendEmail={handleResendEmail}
        />
      )}
    </div>
  )
}

export default ForgotPassword