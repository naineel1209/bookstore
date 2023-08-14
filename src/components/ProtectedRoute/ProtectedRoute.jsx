import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const auth = useGlobalContext();
  const { values } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    if (!values.isLoggedIn) {
      navigate('/login', { replace: true });
    }
  })

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute