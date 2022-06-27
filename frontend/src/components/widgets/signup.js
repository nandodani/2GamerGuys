import React, { useState, useEffect } from "react";
import "../../assets/css/signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AOS from "aos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgsuccess, setMsgSuccess] = useState("");
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/auth/users", {
        username: username,
        name: name,
        lastname: lastname,
        email: email,
        password: password,
        confPassword: confPassword,
      })
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div
      className="signup mx-auto my-auto"
      data-aos="zoom-out-up"
      data-aos-duration="2000"
    >
      <form onSubmit={Register}>
        <Link to="/">
          <img alt="Logo 2GamerGuys" src="/2gamerguys.svg"></img>
        </Link>
        <div className="form-group  my-1 field">
          <label htmlFor="name">Nome</label>
          <input
            maxLength={50}
            type="text"
            className="form-control"
            id="name"
            placeholder="Insira o seu nome..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group  my-1 field">
          <label htmlFor="lastname">Apelido</label>
          <input
            maxLength={50}
            type="name"
            className="form-control"
            id="apelido"
            placeholder="Insira o seu apelido..."
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group  my-1 field">
          <label htmlFor="Username">Username</label>
          <input
            minLength={6}
            type="name"
            className="form-control"
            id="username"
            placeholder="Insira o seu username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group  my-1 field">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Insira o seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group  my-1 field">
          <label htmlFor="Password">Password</label>
          <input
            minLength={8}
            type="password"
            className="form-control"
            id="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group  my-1 field">
          <label htmlFor="Password">Confirmar Password</label>
          <input
            type="password"
            className="form-control"
            id="Password"
            placeholder="Password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            required
          />
        </div>
        <div className="my-2">
          <Link className="link-secondary" to="/login">
            Já tenho conta! Entrar na conta...
          </Link>
        </div>

        <button type="submit" className="btn btn-secondary my-1">
          Criar
        </button>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {msg && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {msg}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
