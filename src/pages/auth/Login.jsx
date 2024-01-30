import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
    setIsSubmitting(true);
    setDisabled(true);

    const { email, password } = loginData;

    if (!validateEmail(email)) {
      toast("Please enter a valid email address", {
        duration: 2000,
        icon: "❌",
      });
    } else if (!validatePassword(password)) {
      toast("Password is required", {
        duration: 2000,
        icon: "❌",
      });
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/login`,
          loginData
        );

        localStorage.setItem("user", JSON.stringify(response.data.sendPayload));
        localStorage.setItem("token", response.data.token);

        navigate("/");
      } catch (error) {
        toast("Login failed. Please check your credentials and try again.", {
          duration: 3000,
          icon: "❌",
        });
      }
    }

    setIsSubmitting(false);
    setDisabled(false);
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={validations}
          disabled={isSubmitting || disabled}
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Submitting...</span>
            </>
          ) : (
            "LOGIN"
          )}
        </button>
        <Toaster />
        <br />
        <span className="">Don't have an account?</span>
        <Link to="/register">Signup</Link>
      </form>
    </div>
  );
};

export default Login;
