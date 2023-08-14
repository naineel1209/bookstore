// import React from 'react'
import { useGlobalContext } from "../context/AuthContext"
const env = import.meta.env;

const Home = () => {
  const auth = useGlobalContext();
  const { values } = auth;
  return (
    <>
      <div className=''>Home</div>

      <div className='container'>
        User Details -
        {
          values.isLoggedIn ? 'user logged in' : 'user not logged in '
        }
        <br />
        {
          values.user._id ? "user details loaded " : " no user details loaded"
        }
      </div>
    </>
  )
}

export default Home