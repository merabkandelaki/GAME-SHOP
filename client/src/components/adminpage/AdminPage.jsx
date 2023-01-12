import React from 'react'
import { GrUserAdmin } from "react-icons/gr";
import { CiUser } from "react-icons/ci";
import { GiAbstract019 } from "react-icons/gi";
import { Link } from 'react-router-dom'
import './AdminPage.css'

const AdminPage = () => {
    return (
        <div className='admin-page'>

            <p>
                <GrUserAdmin/> Admin Page
            </p>

            <h1>
                <Link to="/gamesedit">
                <GiAbstract019 /> Games
                </Link>
            </h1>

            <h1>
                <Link to="/userview">
                    <CiUser/> Users
                </Link>
            </h1>

        </div>
    )
}

export default AdminPage
