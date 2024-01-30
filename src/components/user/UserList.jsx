import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Home from "../Home";

const baseURL = `${process.env.REACT_APP_API}/api/v1/userlist/userdata`;

const UserList = () => {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        setUser(response.data?.user);
      } catch (error) {
        toast.error("Error in Data fetching ", error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage; // current(1) * userperPage(3) = 3
  const indexOfFirstUser = indexOfLastUser - usersPerPage; // 3 - 3 = 0
  const currentUsers = user.slice(indexOfFirstUser, indexOfLastUser); // (0,3)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Home />
      <br />
      <br />
      <br />
      <div>
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
                <td>
                  <span class="material-icons-outlined">edit</span>{" "}
                </td>
                <td>
                  <span class="material-icons">delete</span>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
      </div>
      <Toaster />
    </>
  );
};

export default UserList;
