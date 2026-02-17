import React, { useState, useRef } from 'react'
import './parent.css'
import { useParams, useNavigate } from 'react-router-dom';

const Parent = ({ otpLength = 4 }) => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [otp, setOtp] = useState(
        Array(otpLength).fill('')
    );

    const [toggleOtp, setToggleOtp] = useState(false)

    const inputFields = useRef([]);

    const handleOnchange = (value, i) => {
        let val = Number(value)
        if (value !== " " && value.length < 2 && (val || val === 0)) {
            let newOTP = [...otp]
            newOTP[i] = value;
            setOtp(newOTP)
            inputFields.current[i].style.borderColor = 'black'
            setToggleOtp(false)
            if (i < otpLength - 1 && value !== '') {
                inputFields.current[i + 1].focus();
            }
        }
        else {
            inputFields.current[i].style.borderColor = 'red'
            setToggleOtp(true)
        };
    }

    const handleKeyDown = (e, i) => {
        if (e.key === "Backspace" && !otp[i] && i > 0) {
            inputFields.current[i - 1].focus();
        }
    }

    const handlePaste = (e) => {
        e.preventDefault();
        let pasteOTP = e.clipboardData.getData('text')
        let otpArr = pasteOTP.split('')
        let newotp = [...otp]
        otpArr.forEach((element, index) => {
            if ((Number(element) || element === '0') && index < otpLength) {
                newotp[index] = Number(element)
            }
            else if (index < otpLength) {
                inputFields.current[index].style.borderColor = 'red'
                setToggleOtp(true)
            }
        });
        setOtp(newotp)

    }

    const handleVerify = async () => {
        const resp = await fetch(`http://localhost:5000/${id}`)
        const response = await resp.json()
        let serverOTP = (response.otp).split('')
        if (serverOTP.join('')==otp.join('')) {
           
            console.log('Matched');
            navigate('/')
        }
        else{
            console.log('Not Matched')
        }
    }

    return (
        <div className="flx-c parent-div">
            <div className="flx-r input-holder">
                {otp.map((val, index) => (
                    <input type="text" onPaste={(e) => handlePaste(e)} onKeyDown={(e) => handleKeyDown(e, index)} value={val} key={index} ref={(el) => (inputFields.current[index] = el)} onChange={(e) => handleOnchange(e.target.value, index)} />
                ))}
            </div>
            <button onClick={handleVerify}>Verify</button>
        </div>
    )
}

export default Parent

