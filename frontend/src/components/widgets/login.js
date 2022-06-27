import React, { useState, useEffect } from "react";
import "../../assets/css/login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AOS from "aos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idUser, setIdUser] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5001/api/auth/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          let data = res.data;
          console.log(data)
          window.localStorage.setItem("idUser", data);
        });
        
      console.log("Sucesso");
      navigate("/home");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg, {
          position: "top-center",
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
      className="login border border-rounded mx-auto my-auto"
      data-aos="zoom-out-up"
      data-aos-duration="2000"
    >
      <form method="post" onSubmit={Auth}>
        <Link to="/">
          <img alt="Logo 2GamerGuys" src="/2gamerguys.svg"></img>
        </Link>
        <div className="form-group my-1 field">
          <label for="Email">Email</label>
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
          <label for="Password">Password</label>
          <input
            type="password"
            className="form-control"
            id="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="my-2">
          <Link className="link-secondary" to="/signup">
            Ainda não tenho conta! Registar-me...
          </Link>
        </div>
        <button type="submit" className="btn btn-secondary my-1">
          Entrar
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
