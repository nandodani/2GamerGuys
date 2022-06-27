import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/cards.css";
import AOS from "aos";
import { Link } from "react-router-dom";

export default function FavoriteCard() {
  const [games, setFavorite] = useState([]);

  function getFavorites() {
    const variable = { idUser: localStorage.getItem("idUser") };

    axios
      .post("http://localhost:5001/api/favorites/getfavorites", variable)
      .then((response) => {
        setFavorite(response.data.favorite);
      })
      .catch((error) => {
        console.error("Error:" + error);
      });
  }

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        {games.map((game) => {
          return (
            <div
              key={game.gameId}
              className="card my-4 mx-3 p-0"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <img src={game.background} className="" />

              <h3 className="text-white title">{game.gameTitle}</h3>

              <div className="overlay">
                <Link
                  to={"/game/" + game.gameId}
                  state={{ gameId: game.gameId }}
                  className="text-white link_games"
                >
                  <h3 className="">{game.gameTitle}</h3>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
