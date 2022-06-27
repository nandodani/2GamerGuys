import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/cards.css";
import Loading from "./loading";
import AOS from "aos";
import { Link } from "react-router-dom";
import Favorite from "../buttons/favorite";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function GamesCard() {
  let page = 1;
  const [games, setGames] = useState([]);
  const [Isloading, setIsLoading] = useState(false);
  const getGames = () => {
    axios
      .get(
        "https://api.allorigins.win/raw?url=" +
          encodeURIComponent(
            "https://api.rawg.io/api/games?key=f14490c141614fe09dbfbf5b73564039&page=" +
              page
          )
      )
      .then((res) => {
        setGames((games) => [...games, ...res.data.results]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:" + error);
        setIsLoading(false);
      });
    page += 1;
  };

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      getGames();
    }
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    getGames();
    window.addEventListener("scroll", handleScroll);
  }, []);

  const key = "f14490c141614fe09dbfbf5b73564039";

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        {Isloading && <Loading></Loading>}
        {games.map((game) => {
          return (
            <div
              key={game.id}
              className="card my-4 mx-3 p-0"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <img src={game.background_image} className="" />

              <h3 className="text-white title">{game.name}</h3>

              <div className="overlay">
                <Link to={"/game/" + game.id} state={{gameId:game.id}} className="text-white link_games">
                  <h3 className="">{game.name}</h3>
                  <div
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  ></div>
                  <p>
                    Released: {game.released}
                    <br />
                    Rating: {game.rating}
                  </p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
