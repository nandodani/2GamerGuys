import "../../assets/css/landing.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import React, { useState, useEffect } from "react";

export default function Landing() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="container-fluid m-0 p-0">
      <div
        className="d-flex justify-content-center my-4"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <img
          className="logo-landing row"
          alt="Logo 2GamerGuys"
          src="/2gamerguys.svg"
        />
      </div>
      <div
        className="d-flex justify-content-center my-4"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <h1 className="text-white row">Bem-vindo ao mundo dos jogos!</h1>
      </div>
      <div className="d-flex justify-content-center my-4">
        <div className="row" data-aos="flip-up" data-aos-duration="2000">
          <Link
            to="/login"
            className="btn btn-outline-success text-white col mx-4 px-4 py-3"
          >
            <strong> Entrar </strong>
          </Link>
          <Link
            to="/signup"
            className="btn btn-outline-warning text-white col mx-4 px-4 py-3"
          >
            <strong> Registar </strong>
          </Link>
        </div>
      </div>
    </div>
  );
}
