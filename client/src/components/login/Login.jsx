import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiShow } from "react-icons/bi"
import './Login.css'

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [loginStatus, setLoginStatus] = useState("")

    const [show, setShow] = useState(false)

    axios.defaults.withCredentials = true

    const navigate = useNavigate()

    const handleClick = () => {
        axios.post("http://localhost:5000/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message)
            } else {
                setLoginStatus(response.data[0].username)
            }
            if (username === "admin" && password === "admin") {
                navigate("/adminpage")
            }
        })
    }

    useEffect(() => {
        axios.get("http://localhost:5000/login").then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStatus(response.data.user[0].username)
            }
        })
    }, [])

    const handleShow = () => {
        setShow(!show)
    }

    return (
        <div>
            <div className='form'>
                <h1>Login</h1>

                <input
                    type="text"
                    placeholder='username'
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    name="username"
                />

                <input
                    type={show ? "text" : "password"}
                    placeholder='password'
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    name="password"
                />
                <label onClick={handleShow}><BiShow /></label>

                <button className='formButton' onClick={handleClick}>Login</button>
                <h4>{loginStatus}</h4>
            </div>

        </div>
    )
}

export default Login