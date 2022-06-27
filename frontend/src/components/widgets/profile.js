import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "../../assets/css/profile.css";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default function Dashboard() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  function onDelete(id) {
    Swal.fire({
      icon: "warning",
      title: "Tem a certeza que quer eliminar?",
      text: "Atenção, não é possível recuperar os dados apagados!",
      showCancelButton: true,
      confirmButtonColor: "#f59f00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, é para apagar!",
      cancelButtonText: "Não, mantém os dados.",
    }).then((result) => {
      if (result.value) {
        sendDelete(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon:"success",
          title: "Cancelado",
          text: "Os dados não foram removidos.",
          confirmButtonColor: "#f59f00",
        });
      }
    });
  }

  function sendDelete() {
    axios
      .delete("http://localhost:5001/api/user/delete/" + id)
      .then((res) => {
        if (res.data.success) {
          Swal.fire("Apagado!", "Aluno removido com sucesso.", "success");
        }
      })
      .then(navigate("/"))
      .then(window.localStorage.removeItem("idUser"))
      .catch((error) => {
        alert("Erro: " + error.message);
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
          <small className="text-muted">#{id}</small>
        </h3>
      </div>
      <div className="user-center row mt-4 justify-content-center">
        <span className="border border-secondary rounded d-flex p-3 col-11 my-2">
          <p></p>
          <div className="d-flex col-4">
            <h5 className="m-0">Nome:</h5>
          </div>
          <div className="col-8 d-flex justify-content-end">{name}</div>
        </span>
        <span className="border border-secondary rounded d-flex p-3 col-11 my-2">
          <div className="d-flex col-4">
            <h5 className="m-0">Apelido:</h5>
          </div>
          <div className="col-8 d-flex justify-content-end">{lastname}</div>
        </span>
        <span className="border border-secondary rounded d-flex p-3 col-11 my-2">
          <div className="d-flex col-4">
            <h5 className="m-0">Username:</h5>
          </div>
          <div className="col-8 d-flex justify-content-end">{username}</div>
        </span>
        <span className="border border-secondary rounded d-flex p-3 col-11 my-2">
          <div className="d-flex col-4">
            <h5 className="m-0">Email:</h5>
          </div>
          <div className="col-8 d-flex justify-content-end">{email}</div>
        </span>
      </div>
      <div className="user-bottom my-4 justify-content-center text-center">
        <Link to="/update">
          <button className="btn btn-secondary mx-2">Editar</button>
        </Link>
        <button className="btn btn-danger mx-2" onClick={() => onDelete(id)}>
          Apagar
        </button>
      </div>
    </div>
  );
}
