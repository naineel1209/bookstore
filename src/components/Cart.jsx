import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/AuthContext'

const Cart = () => {
  const auth = useGlobalContext();
  const { values } = auth;

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {

  }, [cartItems])

  return (
    <div>
      <h1 className='home-title'>{values.user.name}'s Cart</h1>

      <div>
      </div>
    </div>
  )
}

export default Cart