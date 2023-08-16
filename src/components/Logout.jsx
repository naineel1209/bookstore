import React, { useEffect } from 'react'
import { useGlobalContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/');
  })

  return (
    <div>Logout</div>
  )
}

export default Logout