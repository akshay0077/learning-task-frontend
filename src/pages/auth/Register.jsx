import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import "./Auth.css";
<<<<<<< Updated upstream

const Register = () => {
=======
import { Link } from "react-router-dom";

const Register = () => {

>>>>>>> Stashed changes
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(false);
<<<<<<< Updated upstream

  const validateAndSetError = (value, validationFunction, errorSetter) => {
    if (!validationFunction(value)) {
      errorSetter();
      return false;
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [errorSetter.name]: "",
      }));
      return true;
    }
  };
=======
>>>>>>> Stashed changes

  const validateFirstName = (firstName) => {
    return firstName.trim().length !== 0;
  };

  const validateEmail = (email) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    return regex.test(password);
  };

  const displayErrorToast = (error) => {
    toast.error(error);
  };

  const handleInvalidFirstName = () => {
    const errorMessage = "Please enter a valid first name";
    setFormState((prevState) => ({
      ...prevState,
      firstNameError: errorMessage,
    }));
    displayErrorToast(errorMessage);
  };

  const handleInvalidEmail = () => {
    const errorMessage = "Please enter a valid email address";
    setFormState((prevState) => ({
      ...prevState,
      emailError: errorMessage,
    }));
    displayErrorToast(errorMessage);
  };

  const handlePasswordMismatch = () => {
    setFormState((prevState) => ({
      ...prevState,
      confirmPasswordError: "Password do not match",
    }));
    displayErrorToast("Password do not match");
  };

  const handleInvalidPassword = () => {
    const errorMessage =
      "Password must be at least 6 characters, contain one capital letter, one digit, and one special character";
    setFormState((prevState) => ({
      ...prevState,
      passwordError: errorMessage,
    }));
    displayErrorToast(errorMessage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< Updated upstream

    const { password, confirmPassword, firstName, email } = formState;

    if (
      !validateAndSetError(firstName, validateFirstName, handleInvalidFirstName)
    ) {
=======
  setIsSubmitting(true);
    setDisabled(true);
    const { password, confirmPassword, firstName, email } = formState;

    if (!validateFirstName(firstName)) {
      handleInvalidFirstName();
      setIsSubmitting(false)
      setDisabled(false)
>>>>>>> Stashed changes
      return;
    }

<<<<<<< Updated upstream
    if (!validateAndSetError(email, validateEmail, handleInvalidEmail)) {
=======
    if (!validateEmail(email)) {
      handleInvalidEmail();
      setIsSubmitting(false);
      setDisabled(false);
>>>>>>> Stashed changes
      return;
    }

    if (password !== confirmPassword) {
      handlePasswordMismatch();
      setIsSubmitting(false);
      setDisabled(false);
      return;
    } else {
      setFormState((prevState) => ({
        ...prevState,
        confirmPasswordError: "",
      }));
    }

<<<<<<< Updated upstream
    if (
      !validateAndSetError(password, validatePassword, handleInvalidPassword)
    ) {
=======
    if (!validatePassword(password)) {
      handleInvalidPassword();
      setIsSubmitting(false);
      setDisabled(false);
>>>>>>> Stashed changes
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        formState
      );

<<<<<<< Updated upstream
      if (res && res.data && res.data.message) {
        toast.success("Registration successful. Please log in.");
=======
      if (res || res.data.success) {
        toast.success(res.data && res.data.message);
>>>>>>> Stashed changes
        navigate("/login");
      } else {
        toast.error(
          res?.data?.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setFormState((prevState) => ({
      ...prevState,
      passwordError: "",
      confirmPasswordError: "",
      firstNameError: "",
      emailError: "",
    }));
  };

  return (
    <>
      <div className="form-container">
        <form>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              className="form-control"
              placeholder="First Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              className="form-control"
              placeholder="Last Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="form-control"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleChange}
              className="form-control"
              placeholder="Confirm Password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isSubmitting || disabled}
          >
<<<<<<< Updated upstream
            {!isSubmitting && !disabled && "REGISTER"}
            {isSubmitting && disabled && "Submitting..."}
            {!isSubmitting && disabled && "Signup-in"}
=======
             {!isSubmitting && !disabled && "REGISTER"}
          {isSubmitting && disabled && "Submitting..."}
           {!isSubmitting && disabled && "Signup-in"}
>>>>>>> Stashed changes
          </button>
          <Toaster />
          <br />
          <span className="">Already have an account?</span>
          <Link to="/login">Login</Link>
        </form>
      </div>
    </>
  );
};

export default Register;
