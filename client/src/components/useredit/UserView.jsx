import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './UserView.css'

const UserView = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/users")
                setUsers(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllUsers()
    }, [])

    return (
        <div>
            <div className="users">
                {users.map(user => (
                    <div className="user" key={user.id}>
                        <div><h3 className='user-id'>id: {user.id}</h3></div>
                        <div className='user-name'>username: {user.username}</div>
                    </div>
                ))}
            </div>
            <div className='back'><button className="back-to"><Link to="/adminpage">Back to Admin</Link></button></div>
        </div>
    )
}

export default UserView