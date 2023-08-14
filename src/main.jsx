import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import { AppProvider } from './/context/AuthContext.jsx';
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={
        <AppProvider>
          <App />
        </AppProvider>
      } />
    </Routes>
  </BrowserRouter>,
);
