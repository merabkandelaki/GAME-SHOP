import React, {useState, useEffect} from 'react'
import './Cart.css'

const Cart = ({ cart, setCart, handleChange }) => {
  const [price, setprice] = useState(0)
  const handleRemove = (id) => {
    const arr = cart.filter((game) => game.id !== id);
    setCart(arr);
    handlePrice();
  }
  const handlePrice = () => {
    let ans = 0
    cart.map((game) => (ans += game.amount * game.price));
    setprice(ans);
  }
  useEffect(() => {
    handlePrice();
  })

  return (
    <article>
      {cart.map((game) => (
        <div className='cart-box' key={game.id}>
          <div className='cart-img'>
            <img src={game.cover} alt=""/>
            <p>{game.title}</p>
          </div>
          <div>
            <button onClick={() => handleChange(game, 1)}>+</button>
            <button>{game.amount}</button>
            <button onClick={() => handleChange(game, -1)}>-</button>
          </div>
          <div>
            <span>{game.price * game.amount}$</span>
            <button onClick={() => handleRemove(game.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className='total'>
        <span>Total price of your Cart:</span>
        <button>Buy now</button>
        <span>{price}$</span>
      </div>
    </article>
  )
}

export default Cart
