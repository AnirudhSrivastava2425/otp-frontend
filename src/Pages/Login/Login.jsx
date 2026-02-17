import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './Login.css'
const Login = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const [mail, setMail] = useState('');

    const handleMailChange = (val) => {
        setMail(val)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const resp = await fetch(`http://localhost:5000/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: mail
            })
        })
        let response = await resp.json();
        if (response.status === 'send') {
            setLoading(false)
            navigate(`./otp/${response.userID}`)
        }
        else{
            setLoading(false)
            alert('Some error occured. Please hang tight and we will fix this shortly.')
        }
    }
    return (
        <div className='bg-holder flx-c'>
            <div className="form-handle flx-c">
                {
                    loading ? <h1>Loading...</h1> : <>
                        <h1>Let's handle OTP Authentication.</h1>
                        <form className='flx-c email-form' onSubmit={(e) => handleSubmit(e)}>
                            <label htmlFor="emailID">Enter Email Address</label>
                            <input type="email"
                                name='emailID'
                                id='emailID'
                                placeholder='Please enter your email...'
                                onChange={(e) => handleMailChange(e.target.value)}
                                value={mail}
                            />
                            <input type="submit" value="Send OTP" />
                        </form></>
                }
            </div>
        </div>
    )
}

export default Login