import React from 'react'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/" style= {({isActive}) => {
                    return { color: ( isActive ) ? 'red' : 'white' }
                }}>Home</NavLink>
      <NavLink to="/about" style= {({isActive}) => {
                    return { color: ( isActive ) ? 'red' : 'white' }
                }}>About</NavLink>
      <NavLink to="/contact" style= {({isActive}) => {
                    return { color: ( isActive ) ? 'red' : 'white' }
                }}>Contact</NavLink>
    </div>
  )
}

export default Navbar