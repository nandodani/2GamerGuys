import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "../../assets/css/nav.css";

export default function Nav() {


  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5001/api/auth/logout");
      navigate("/");
      window.localStorage.removeItem("idUser");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar fixed-top navlogin text-white">
      <div className="container-fluid">
        <Link className="navbar-brand ms-5 text-white col-1" to="/home">
          <img alt="Logo 2GamerGuys" src="/2gamerguys.svg"></img>
        </Link>

        <div className="navbar-nav mx-5 p-3">
          <div className="row">
            <div className="col mx-1">
              <Link className="nav-link text-white navbtn" to="/favorites">
                Favoritos
              </Link>
            </div>
            <div className="col mx-1">
              <Link className="nav-link text-white navbtn" to="/profile">
                Perfil
              </Link>
            </div>
            <div className="col mx-1 sair">
              <button className="nav-link  sair btn btn-outline-danger px-3 text-white" onClick={Logout}>
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
