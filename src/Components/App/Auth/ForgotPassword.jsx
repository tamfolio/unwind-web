import React, { useState } from 'react'
import InitiateReset from './InitiateReset'

function ForgotPassword() {
    const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className='w-full'>
      <InitiateReset/>
    </div>
  )
}

export default ForgotPassword
