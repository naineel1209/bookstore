import { Button } from '@mui/material'
import { useEffect, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import BookIcon from '@mui/icons-material/Book';
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      // console.log(scrollY);
      setScrolled(window.scrollY > 50);
    })


    return () => {
      window.removeEventListener("scroll", () => {
        // console.log(scrollY);
        setScrolled(window.scrollY > 50);
      })
    }
  })

  return (
    <>
      <div className={((scrolled) ? "scrolled" : " ") + " navbar"}>
        <div className="logo">
          <BookIcon />
          <h1>NS BookStore</h1>
          <BookIcon />
        </div>
        <div className="nav-items">

          <NavLink to="/" className={({ isActive }) => {
            return (isActive) ? 'active' : '';
          }} >Home</NavLink>

          <NavLink to="/about" className={({ isActive }) => {
            return (isActive) ? 'active' : '';
          }} >About</NavLink>

          <NavLink to="/contact" className={({ isActive }) => {
            return (isActive) ? 'active' : '';
          }} >Contact</NavLink>

        </div>

        <div className="login-section">
          <NavLink to="/login">
            <Button variant="contained" color="primary" endIcon={<LoginIcon />}>Login</Button>
          </NavLink>
          <NavLink to="/signup">
            <Button variant="outlined" color="primary" endIcon={<LoginIcon />}>SignUp</Button>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Navbar;