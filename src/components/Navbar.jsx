import { Button } from '@mui/material'
import { useEffect, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import BookIcon from '@mui/icons-material/Book';
import { Link, NavLink } from 'react-router-dom'
import { useGlobalContext } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const auth = useGlobalContext();
  const { values } = auth;

  console.log(auth);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 50);
    })


    return () => {
      window.removeEventListener("scroll", () => {
        setScrolled(window.scrollY > 50);
      })
    }
  }, [values.isLoggedIn]);

  return (
    <>
      <div className={((scrolled) ? "scrolled" : " ") + " navbar"}>
        <div className="logo">
          <BookIcon />
          <h1>NS BookStore</h1>
          <BookIcon />
        </div>
        <div className="nav-items">

          {
            (!values.isLoggedIn) ? (<>
              <NavLink to="/" className={({ isActive }) => {
                return (isActive) ? 'active' : '';
              }} >Home</NavLink>
            </>
            ) : (<>
              <NavLink to="/" className={
                ({ isActive }) => {
                  return (isActive) ? 'active' : '';
                }}>Home</NavLink>

              <NavLink to="/post-book" className={
                ({ isActive }) => {
                  return (isActive) ? 'active' : '';
                }}>Post a New Book</NavLink>

              <NavLink to="/about" className={({ isActive }) => {
                return (isActive) ? 'active' : '';
              }} >About</NavLink>

              <NavLink to="/cart" className={({ isActive }) => {
                return (isActive) ? 'active' : '';
              }} >Cart</NavLink>
            </>)
          }

        </div >

        {
          (values.isLoggedIn) ? (
            <div className='navbar-profile'>
              <div className='name'>
                Hello, <span>{values.user.name}</span>

                <div className='admin-title'>
                  Admin Dashboard
                </div>
              </div>
              <div>
                <NavLink to="/logout">
                  <Button variant="contained" color="primary" endIcon={<LoginIcon />}>Logout</Button>
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="login-section">
              <NavLink to="/login">
                <Button variant="contained" color="primary" endIcon={<LoginIcon />}>Login</Button>
              </NavLink>
              <NavLink to="/signup">
                <Button variant="outlined" color="primary" endIcon={<LoginIcon />}>SignUp</Button>
              </NavLink>
            </div>
          )
        }
      </div >
    </>
  )
}

export default Navbar;