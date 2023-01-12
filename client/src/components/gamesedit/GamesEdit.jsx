import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './GamesEdit.css'

const GamesEdit = () => {

    const [games, setGames] = useState([])

    useEffect(() => {
        const fetchAllGames = async () => {
            try {
                const res = await axios.get("http://localhost:5000/games")
                setGames(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllGames()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:5000/games/" + id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className="games-all">
                {games.map(game => (
                    <div className="game-one" key={game.id}>

                        <div>{game.cover && <img className='game-image-one' src={game.cover} alt="" />}</div>
                        <div><h3 className='game-title-one'>{game.title}</h3></div>
                        <div className='game-price-one'>{game.price} $ USA</div>
                        <div><button className="game-delete-button-one" onClick={() => handleDelete(game.id)}>Delete</button></div>
                        <div><button className="game-update-button-one"><Link to={`/update/${game.id}`}>Update</Link></button></div>

                    </div>
                ))}
            </div>
            <div className='game-add'><button className='game-add-button-one'><Link to="/add">Add New Game</Link></button></div>
            <div className='back-to-admin'><button className='back-to-admin-page'><Link to="/adminpage">Back to Admin</Link></button></div>
        </div>
    )
}

export default GamesEdit