import Nav from "../components/widgets/nav";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import CardGames from "../components/widgets/cardgames";
import "../assets/css/home.css";

export default function Home() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/auth/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        window.localStorage.removeItem("idUser");
        navigate("");
      }
    }
  };

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axiosJWT.get(
      "http://localhost:5001/api/auth/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUsers(response.data);
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(
          "http://localhost:5001/api/auth/token"
        );
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setUsername(decoded.username);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div className="home">
      <header>
        <Nav />
      </header>
      <div className="d-flex justify-content-center title-home">
        <h1 className="text-white">Bem-vindo <span className="username">{username}</span>!</h1>
      </div>
      <CardGames />
    </div>
  );
}
