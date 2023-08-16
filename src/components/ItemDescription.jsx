import { useState } from 'react';
import { useGlobalContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ItemDescription(props) {
  const [contracted, setContracted] = useState(true);
  const auth = useGlobalContext();
  const { values } = auth;

  const [loading, setLoading] = useState(false);

  {
    /* basically -> send a post request for every click on the add to cart button to the */
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(() => true);
    if (values.isLoggedIn) {
      const cartData = {
        userId: values.user.id,
        bookId: props.book.id,
        quantity: 1,
      }
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(cartData),
      });

      const data = await res.json();

      if (data.key === "SUCCESS") {
        toast.success(`${props.book.name} - Added to cart`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      } else if (data.key === "CONFLICT") {
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
    } else {
      toast.error('Please Login First', {
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
    setLoading(() => false);
  }

  return (
    <div key={props.book._id} className='card'>
      <div className='card-body'>
        <img src={props.book.base64image} alt={props.book.name.toUpperCase()} className="card-image" />
        <div style={{ paddingTop: '1rem' }}>
          <h2 className="card-title">{props.book.name.toUpperCase()}</h2>

          <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingInline: '1rem', paddingBlockEnd: '1rem' }}>
            <p className="card-price">${props.book.price}</p>
            <p className='card-category'>{props.book.category}</p>
          </div>
          <p className="card-description">
            {contracted ? props.book.description.substring(0, 30) + '...' : props.book.description}
            <span style={{
              fontSize: 'small',
              cursor: 'pointer',
              color: 'blue',
              textDecoration: 'underline'
            }} onClick={() => {
              setContracted(prev => !prev);
            }}>{(contracted) ? 'Read More' : 'Read Less'}</span>
          </p>

          <button className="card-add2cart" onClick={handleClick} disabled={loading}>
            Add To Cart
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
