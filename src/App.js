import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
              <Login />
          }
        />
        <Route
          path="/"
          element={
              <Register />
          }
        />
      </Routes>
    </>
  )
}

export default App