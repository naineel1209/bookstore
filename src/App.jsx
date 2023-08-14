import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home, About, Contact, NotFound, Login, Signup, Logout } from './components'
import SharedLayout from './layout/SharedLayout'
function App() {
  return (<>
    <Routes>
      <Route path="/" element={<SharedLayout />} >
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/logout' element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </>
  )
}

export default App
