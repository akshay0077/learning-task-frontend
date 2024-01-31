import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

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
      } catch (error) {
        toast.error("Error in Data fetching ", error);
      }
    };

    fetchData();
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
    <>
      <Home />

      <div className="listdata">
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
            {filteredUsers.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>
                  <span className="material-icons">edit</span>{" "}
                </td>
                <td>
                  <span className="material-icons">delete</span>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
      </div>
      <Toaster />
    </>
  );
};

export default UserList;
