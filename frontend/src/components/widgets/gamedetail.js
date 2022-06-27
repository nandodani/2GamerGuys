import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/details.css";
import Favorite from "../buttons/favorite";

import { useLocation } from "react-router-dom";

const GameDetail = () => {
  const location = useLocation();
  const { gameId } = location.state;

  const [data, setData] = useState([]);

  useEffect(() => {
    details();
  }, []);

  const details = () => {
    axios
      .get(
        "https://api.allorigins.win/raw?url=" +
          encodeURIComponent(
            "https://api.rawg.io/api/games/" +
              gameId +
              "?key=f14490c141614fe09dbfbf5b73564039"
          )
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="text-white" key={data.id}>
        <div>
          <img className="game_img" src={data.background_image} alt="" />
        </div>
        <section className="px-4 row">
          <h1 className="game_name mx-auto">{data.name}</h1>
          <Favorite gameInfo={data} idUser={localStorage.getItem('idUser')} />
          <div className="card_description p-0 col-10 mx-auto">
            <img className="me-4" src={data.background_image_additional} />
            <div>
              <h4>Description:</h4>
              <p className="description_game ms-2 text-justify">
                {data.description_raw}
              </p>
              <h5>Released:</h5>
              <p>{data.released}</p>
            </div>
          </div>
          <hr className="my-4 mx-auto col-10 hr_details" />
          <section className="px-4 row game_infos">
            <h2 className="mb-4">Game Links</h2>
            <div className="link_games text-white col-4">
              <a href={data.metacritic_url} className="text-white">
                <img src="/metacritic.svg" /> <b>{data.metacritic}</b>
              </a>
            </div>
            <div className="link_games text-white col-4">
              <a href={data.reddit_url} className="text-white">
                <img src="/reddit.svg" /> <b>{data.reddit_name}</b>
              </a>
            </div>
            <div className="link_games text-white col-4">
              <a href={data.website} className="text-white">
                <img src="/website.svg" /> <b>{data.name}</b>
              </a>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};
export default GameDetail;
