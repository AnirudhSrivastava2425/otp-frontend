import React from 'react'
import Parent from '../../components/Parent'
import './otp.css'

const OtpHandler = () => {
  return (
    <div className='otp-holder flx-c'>
        <h1>Enter OTP...</h1>
        <p>Please check your spam folder if otp is not received.</p>
        <Parent/>
    </div>
  )
}

export default OtpHandler