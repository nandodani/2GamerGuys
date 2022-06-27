import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/nav.css";


export default function Nav() {

    return (
        <nav className="navbar navlogin text-white">
            <div className="container-fluid">
                <Link className="navbar-brand ms-5 text-white col-1" to="/"><img alt="Logo 2GamerGuys" src="/2gamerguys.svg"></img> </Link>
                <div className="navbar-nav mx-5 p-3">
                    <div className="row">
                        <div className="col btn btn-outline-success me-2">
                            <Link className="nav-link text-white navbtn" to="/login"><b>Entrar</b></Link>
                        </div>
                        <div className="col btn btn-outline-warning me-2">
                            <Link className="nav-link text-white navbtn" to="/signup"><b>Registar</b></Link>
                        </div>
                    </div>
                </div>
            </div>

        </nav>
    )
}