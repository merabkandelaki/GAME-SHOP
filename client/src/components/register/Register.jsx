import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiShow } from "react-icons/bi";
import './Register.css'

const Register = () => {

    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")

    const [show, setShow] = useState(false)

    const navigate = useNavigate()

    const handleClick = () => {
        axios.post("http://localhost:5000/register", {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response)
        })
        navigate("/login")
    }

    const handleShow = () => {
        setShow(!show)
    }

    return (
        <div className='form'>
            <h1>Registration</h1>

            <input
                type="text"
                placeholder='username'
                onChange={(e) => {
                    setUsernameReg(e.target.value)
                }}
                name="username"
            />

            <input
                type={show ? "text" : "password"}
                placeholder='password'
                onChange={(e) => {
                    setPasswordReg(e.target.value)
                }}
                name="password"
            />
            <label onClick={handleShow}><BiShow /></label>

            <button className='formButton' onClick={handleClick}>Register</button>
        </div>
    )
}

export default Register