import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';

import "aos/dist/aos.css";


import Landing from "./pages/landing";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Favorites from "./pages/favorites";
import Game from "./pages/game";
import Profile from "./pages/profile";
import Update from "./pages/update";
import NotFound from "./pages/notfound";

function App() {
  return (
    <Router>
      <>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/game/:id" element={<Game />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/update" element={<Update />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
