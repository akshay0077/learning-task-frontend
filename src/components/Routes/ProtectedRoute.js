import React, { useState, useEffect } from "react";
import { useAuth } from "../Hooks/useAuth.js";
import { Outlet, Navigate } from "react-router-dom"; // Added Navigate
import axios from "axios";

export default function ProtectedRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/login`,
          {
            headers: {
              authorization: auth.token,
            },
          }
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Navigate to="/login" />;
}
