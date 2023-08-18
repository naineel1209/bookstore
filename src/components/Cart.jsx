import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/AuthContext'
import '../styles//Cart.css'
import { Button } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
const env = import.meta.env;


function CartItem(props) {

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    console.log('Delete clicked for cart id', props.item.id);
    const deleteItemId = props.item.id;

    try {
      const res = await fetch(`${env.VITE_BASE_URL}/cart?id=${deleteItemId}`, {
        method: 'DELETE',
        redirect: 'follow'
      });

      const data = await res.json();
      console.log(data);
      if (data.key === 'SUCCESS') {
        props.setClickedDeleted(!props.clickedDeleted);
        toast.success(`${props.item.book.name} - Removed from cart`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      } else {
        console.log('Error in deleting cart item');
        toast.error(`${data.error}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }

    } catch (e) {
      console.log('Error in CartItem.jsx');
      console.log(e);
    }
  }

  return (<div className="cart-item" >
    <div className="item-image">
      <img src={props.item.book.base64image} alt={props.item.book.name} />
    </div>
    <div className="item-details">
      <div>
        <h3>{props.item.book.name}</h3>
        <p>{props.item.book.description}</p>
        <p className="price">Price: ${props.item.book.price}</p>
        <p className="quantity">Quantity: {props.item.quantity}</p>
        <p className="total">Total: ${props.item.book.price * props.item.quantity}</p>
      </div>
      <div>
        <Button variant="contained" color="error" onClick={handleDeleteClick}>Remove</Button>
      </div>
    </div>
    <ToastContainer />
  </div >);
}


const Cart = () => {
  const auth = useGlobalContext();
  const { values } = auth;
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [clickedDeleted, setClickedDeleted] = useState(false);

  const handleOrderClick = async (e) => {

    try {
      const cartData = {
        userId: values.user.id,
        cartIds: cartItems.map((item) => item.id),
      }

      const res = await fetch(`${env.VITE_BASE_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        redirect: 'follow',
        body: JSON.stringify(cartData),
      })

      const data = await res.json();

      if (data.key === 'SUCCESS') {
        toast.success(`Order Placed Successfully!`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })

        navigate("/order-success", {
          replace: true,
          state: { order: data.result, cartItems: cartItems, cartTotal: cartTotal }
        })



      } else {
        toast.error(`${data.error}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (e) {
      console.log(e);
      console.log("Error in Cart.jsx")
    };
  }

  useEffect(() => {
    const getCartBooks = async () => {
      try {
        const res = await fetch(`${env.VITE_BASE_URL}/cart?userId=${values.user.id}`);
        const data = await res.json();

        setCartItems(() => data.result);
        setCartTotal(() => {
          return cartItems.reduce((total, item) => { return (total + item.book.price * item.quantity) }, 0)
        })
        console.log(data.result);

      } catch (e) {
        console.log('Error in Cart.jsx');
        console.log(e);
      }
    }

    getCartBooks();
  }, [clickedDeleted])

  if (cartItems.length === 0) {
    return (
      <div>
        <h1 className='home-title'>{values.user.name}'s Cart</h1>
        <div className='empty-cart'>
          <h2>Cart is empty. Add some items from <Link to="/">here....</Link></h2>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className='home-title'>{values.user.name}'s Cart</h1>

      <div>
        {
          cartItems.map((item) => {
            return (
              <CartItem key={item.id} item={item} clickedDeleted={clickedDeleted} setClickedDeleted={setClickedDeleted}></CartItem>
            )
          })
        }
      </div>


      <div className="buy-box">
        <h2>Total: $ <span>{cartTotal}</span></h2>
        <Button variant="contained" color="primary" onClick={handleOrderClick}>Buy Now</Button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Cart