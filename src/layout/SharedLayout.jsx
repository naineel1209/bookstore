import React from 'react'
import { Navbar, Footer } from '../components'
import { Outlet } from 'react-router-dom'

const SharedLayout = () => {
  return (<>
    <Navbar />
    <Outlet />
    {/* <Footer /> */}
  </>
  )
}

export default SharedLayout