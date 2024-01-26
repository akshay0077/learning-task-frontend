import React, { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.trim().length !== 0;
  };

  const validations = async () => {
    const { email, password } = loginData;

    if (!validateEmail(email)) {
      toast("Please enter a valid email address", {
        duration: 2000,
        icon: "❌",
      });
      return;
    }

    if (!validatePassword(password)) {
      toast("Password is required", {
        duration: 2000,
        icon: "❌",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        loginData
      );
    } catch (error) {
      toast("Login failed. Please check your credentials and try again.", {
        duration: 3000,
        icon: "❌",
      });
    }
  };

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-container ">
      <form>
        <h4 className="title">LOGIN FORM</h4>

        <div className="mb-3">
          <input
            type="email"
            autoFocus
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Email "
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            required
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={validations}>
          LOGIN
        </button>
        <Toaster />
        <br />
        <span className="">Don't have an account?</span>
        <Link to="/">Signup</Link>
      </form>
    </div>
  );
};

export default Login;
