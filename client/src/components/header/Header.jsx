import React from 'react'
import { GiAbstract019 } from "react-icons/gi";
import { Link } from 'react-router-dom'
import "./Header.css"

const Header = ({ setShow, totalAmount }) => {

  return (
    <nav>

      <div className='nav-box'>
        <Link to="/">
          <span className='my-shop' onClick={() => setShow(true)}><GiAbstract019 />Games Shop</span>
        </Link>

        <Link to="/register">
          <span className='register'>Register</span>
        </Link>

        <Link to="/login">
          <span className='login'>Login</span>
        </Link>

        <div className='cart'>
          <Link to="/cart">
          <span>
            <i className="fas fa-cart-plus" onClick={() => setShow(false)}></i>
          </span>
          </Link>
          <span>{totalAmount}</span>
        </div>

      </div>

    </nav>
  )
}

export default Header
