import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "../../assets/css/profile.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default function FormUpdate() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  function sendUpdate() {
    const datapost = {
      name: name,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
    };
    axios
      .put("http://localhost:5001/api/user/update/" + id, datapost)
      .then((res) => {
        if (res.data.success === true) {
            Swal.fire("Atualizado!", "Os teus dados foram atualizados com sucesso!", "success");
        } else {
          alert("Error");
        }
      })
      .then(
        navigate("/profile")
      )
      .catch((error) => {
        alert("Erro [" + error + "]");
      });
  }

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/auth/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        window.localStorage.removeItem("idUser");
        navigate("/");
      }
    }
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
        setId(decoded.id);
        setName(decoded.name);
        setLastName(decoded.lastname);
        setUsername(decoded.username);
        setEmail(decoded.email);
        setPassword(decoded.password);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

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

  return (
    <div className="container-fluid profile">
      <div className="user-top text-center mb-4 justify-content-center">
        <img style={{ height: 150 }} src="/user.png" />
        <h3 className="">
          {name}
          <b className="text-secondary" readOnly="readOnly">#{id}</b>
        </h3>
      </div>
      <div className="user-center row mt-4 justify-content-center">
        <form>
          <div className="form-group row py-2">
            <label htmlFor="inputName" className="col-md-1 text-end fw-bold">
              Nome:
            </label>
            <div className="col-md-11">
              <input
                type="text"
                id="name"
                name="inputName"
                className="form-control"
                placeholder="Nome"
                value={name}
                onChange={(value) => setName(value.target.value)}
              ></input>
            </div>
          </div>
          <div className="form-group row py-2">
            <label
              htmlFor="inputLastname"
              className="col-md-1 text-end fw-bold"
            >
              Apelido:
            </label>
            <div className="col-md-11">
              <input
                type="text"
                id="lastname"
                name="inputLastname"
                className="form-control"
                placeholder="Apelido"
                value={lastname}
                onChange={(value) => setLastName(value.target.value)}
              ></input>
            </div>
          </div>
          <div className="form-group row py-2">
            <label
              htmlFor="inputUsername"
              className="col-md-1 text-end fw-bold"
            >
              Username:
            </label>
            <div className="col-md-11">
              <input
                type="text"
                id="username"
                name="inputUsername"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(value) => setUsername(value.target.value)}
              ></input>
            </div>
          </div>
          <div className="form-group row py-2">
            <label htmlFor="inputEmail" className="col-md-1 text-end fw-bold">
              Email:
            </label>
            <div className="col-md-11">
              <input
                type="text"
                id="email"
                name="inputEmail"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(value) => setEmail(value.target.value)}
              ></input>
            </div>
          </div>
          <div className="form-group row py-2">
            <label
              htmlFor="inputPassword"
              className="col-md-1 text-end fw-bold"
            >
              Password:
            </label>
            <div className="col-md-11">
              <input
                type="text"
                id="password"
                name="inputPassword"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(value) => setPassword(value.target.value)}
              ></input>
            </div>
          </div>
        </form>
      </div>
      <div className="user-bottom my-4 justify-content-center text-center">
        <button className="btn btn-secondary mx-2" onClick={() => sendUpdate()}>
          Atualizar
        </button>
      </div>
    </div>
  );
}
