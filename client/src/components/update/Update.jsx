import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Update.css'

const Update = () => {

    const [game, setGame] = useState({
        title: "",
        desc: "",
        genres: "",
        price: null,
        cover: "",
    })

    const navigate = useNavigate()
    const location = useLocation()

    const gameId = location.pathname.split("/")[2]

    const handleChange = (e) => {
        setGame(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:5000/games/" + gameId, game)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    console.log(game)

    return (
        <div className='form'>

            <h1>Update The Game</h1>

            <input
                type="text"
                placeholder='title'
                onChange={handleChange}
                name="title"
            />

            <input
                type="text"
                placeholder='desc'
                onChange={handleChange}
                name="desc"
            />

            <input
                type="text"
                placeholder='genres'
                onChange={handleChange}
                name="genres"
            />

            <input
                type="number"
                placeholder='price'
                onChange={handleChange}
                name="price"
            />

            <input type="text"
                placeholder='cover'
                onChange={handleChange}
                name="cover"
            />

            <button className='formButton' onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update

