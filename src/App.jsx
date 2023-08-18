import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home, About, Category, NotFound, Login, Signup, Logout, SearchComponent, PostBook, Cart, OrderSuccess } from './components'
import SharedLayout from './layout/SharedLayout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
function App() {
  return (<>
    <Routes>
      <Route path="/" element={<SharedLayout />} >
        <Route index element={<Home />} />
        <Route path="/search/:keyword" element={<SearchComponent />} />
        <Route path="/about" element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>} />
        <Route path="/category" element={
          <ProtectedRoute >
            <Category />
          </ProtectedRoute>} />
        <Route path="/post-book" element={
          <ProtectedRoute>
            <PostBook />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path='/logout' element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </>
  )
}

export default App
