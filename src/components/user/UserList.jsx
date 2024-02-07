import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
<<<<<<< Updated upstream
import axios from "axios";
=======
<<<<<<< HEAD
import axios from 'axios';
import 'material-icons/iconfont/material-icons.css';
import Home from '../Home';
=======
import axios from "axios";
import "material-icons/iconfont/material-icons.css";
import Home from "../Home";
>>>>>>> [Resolved]: modify the userlist response
>>>>>>> Stashed changes

import Home from "../Home";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< Updated upstream
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = parseInt(urlParams.get("page")) || 1;
        const limitParam = parseInt(urlParams.get("limit")) || 10;

        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/users?page=${pageParam}&limit=${limitParam}`,
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );
        setUsers(response.data?.user);
        setCurrentPage(pageParam);
        setTotalPages(response.data?.countPage);
        setUsersPerPage(limitParam);
=======
<<<<<<< HEAD
=======
        console.log(baseURL);
>>>>>>> [Resolved]: modify the userlist response
        const response = await axios.get(baseURL, {
          headers: {
            authorization : localStorage.getItem("token")
        }});
        setUser(response.data?.user);
        console.log(response);
        // toast.success("User Data Show Successfully");
>>>>>>> Stashed changes
      } catch (error) {
        toast.error("Error in Data fetching ", error);
      }
    };
fetchData()
  }, []);

  const loggedInUserId = JSON.parse(localStorage.getItem("user"));

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const filteredUsers = currentUsers.filter(
    (item) => item.id !== loggedInUserId.id
  );

  const changeLimit = (newLimit) => {
    const url = `/users?page=${currentPage}&limit=${newLimit}`;
    window.history.pushState({ path: url }, "", url);
    setUsersPerPage(newLimit);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <a className="page-link" href="#" onClick={() => setCurrentPage(i)}>
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };

  return (
<<<<<<< Updated upstream
    <>
      <Home />

      <div className="listdata">
=======
<<<<<<< HEAD
    <div>
      <Home/><br /><br /><br />
      <h2>User List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.email}</td>
              <td><span class="material-icons-outlined">edit</span> </td>
              <td><span class="material-icons">delete</span> </td>
=======
    <>
      <Home />
      <br />
      <br />
      <br />
      <div>
>>>>>>> Stashed changes
        <h2>User List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
<<<<<<< Updated upstream
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((item) => (
=======
>>>>>>> [Resolved]: modify the userlist response
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((item) => (
>>>>>>> Stashed changes
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>
<<<<<<< Updated upstream
                  <span className="material-icons">edit</span>{" "}
                </td>
                <td>
                  <span className="material-icons">delete</span>{" "}
=======
                  <span class="material-icons-outlined">edit</span>{" "}
                </td>
                <td>
                  <span class="material-icons">delete</span>{" "}
>>>>>>> Stashed changes
                </td>
              </tr>
            ))}
          </tbody>
        </table>

<<<<<<< Updated upstream
        <ul className="pagination">{renderPagination()}</ul>

        <div className="limit-selector">
          <label htmlFor="limit">Items per page:</label>
          <select
            id="limit"
            value={usersPerPage}
            onChange={(e) => changeLimit(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
=======
        <ul className="pagination">
          {Array.from({ length: Math.ceil(user.length / usersPerPage) }).map(
            (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
>>>>>>> Stashed changes
      </div>
      <Toaster />
    </>
  );
};

export default UserList;
