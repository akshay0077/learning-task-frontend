import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Home from "./components/Home";
import UserList from "./components/user/UserList";
import ProtectedRoute from "./components/Routes/ProtectedRoute.js";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </>
  );
};

export default App;
