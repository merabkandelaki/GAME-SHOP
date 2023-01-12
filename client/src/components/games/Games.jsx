import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Games.css'

const Games = ({ handleClick }) => {

    const [games, setGames] = useState([])

    useEffect(() => {
        const fetchAllGames = async () => {
            try {
                const res = await axios.get("http://localhost:5000/games")
                res.data.forEach(game => game.amount = 1)
                setGames(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllGames()
    }, [])

    return (
        <div className="games">
            {games.map(game => (
                <div className="game" key={game.id}>

                    <div>{game.cover && <img className='game-image' src={game.cover} alt="" />}</div>
                    <div><h3 className='game-title'>{game.title}</h3></div>
                    <div className='game-desc'>{game.desc}</div>
                    <div className='game-genres'>{game.genres}</div>
                    <div className='game-price'>{game.price} $ USA</div>
                    <div><button className='game-add-to-cart' onClick={() => handleClick(game)}>Add To Cart</button></div>

                </div>

            ))}

        </div>
    )

}

export default Games

