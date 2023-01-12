import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/header/Header"
import Games from "./components/games/Games"
import Add from "./components/add/Add"
import Update from "./components/update/Update"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import AdminPage from "./components/adminpage/AdminPage"
import GamesEdit from "./components/gamesedit/GamesEdit"
import UserView from "./components/useredit/UserView"
import Cart from "./components/cart/Cart"

const App = () => {

  const [show, setShow] = useState(true)
  const [cart, setCart] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  const handleClick = (game) => {
    const updatedCart = [];
    cart.forEach(cartItem => updatedCart.push(cartItem))

    const matchedGame = updatedCart.find(cartItem => cartItem.id === game.id);
    if (matchedGame) {
      matchedGame.amount += 1
    } else {
      updatedCart.push(game)
    }

    setCart(updatedCart);

  }

  useEffect(() => {
    console.log(cart)
    setTotalAmount(cart.length)

  }, [cart])

  const handleChange = (game, d) => {
    const ind = cart.indexOf(game);
    let arr = cart;

    arr[ind].amount += d;

    if (arr[ind].amount === 0) {
      console.log('lorem', game)
      arr[ind].amount = 1;
      arr = cart.filter((item) => item.id !== game.id);
    }

    setCart([...arr]);
  }

  return (
    <div className="App">
      <BrowserRouter>

        <Header totalAmount={totalAmount} setShow={setShow} size={cart.length} />

        <Routes>
          <Route path="/" element={show ? <Games handleClick={handleClick} /> : <Cart cart={cart} setCart={setCart} handleChange={handleChange} />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/gamesedit" element={<GamesEdit />} />
          <Route path="/userview" element={<UserView />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} handleChange={handleChange} />} />
        </Routes>

      </BrowserRouter>

    </div>
  );
}


export default App;

