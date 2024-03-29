import React from "react";
import { NavLink, Link, Navigate } from "react-router-dom";

const Home = () => {
  const userJSON = localStorage.getItem("user");

  const user = userJSON ? JSON.parse(userJSON) : null;

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="navbar-brand">
                  TH Learning Task
                </Link>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              {user ? (
                <>
                  <li className="nav-item dropdown">
                    <Link className="nav-link" to={"/users"}>
                      User
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link">{user.firstname}</span>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/login"
                      className="nav-link"
                      onClick={() => {
                        localStorage.removeItem("user");
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <Navigate to={"/login"} />
                  <li className="nav-item dropdown">
                    <Link className="nav-link" to={"/users"}>
                      User
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/post"}>
                      Post
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/comment"}>
                      Comment
                    </Link>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Home;
