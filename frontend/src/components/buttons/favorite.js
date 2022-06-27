import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

function Favorite(props) {
  const [Favorited, setFavorited] = useState(false);

  const variable = {
    idUser: props.idUser,
    gameId: props.gameInfo.id,
    gameTitle: props.gameInfo.name,
    background: props.gameInfo.background_image,
  };

  useEffect(() => {
    axios
      .post("http://localhost:5001/api/favorites/favorited", variable)
      .then((response) => {
        if (response.data.success) {
          setFavorited(response.data.favorited);
        } else {
          alert("Failed to get Favorite Info");
        }
      });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      // Se já estiver adicionado na lista

      axios
        .post(
          "http://localhost:5001/api/favorites/removefromfavorite",
          variable
        )
        .then((response) => {
          if (response.data.success) {
          } else {
            Swal.fire({
              icon: "success",
              title: "Removido da lista de fvoritos!",
              text: "O jogo foi removido da lista de favoritos com sucesso!",
              confirmButtonColor: "#f59f00",
            });
            setFavorited(!Favorited);
          }
        });
    } else {
      //Se não estiver adicionado na lista

      axios
        .post("http://localhost:5001/api/favorites/addfavorite", variable)
        .then((response) => {
          if (response.data.success) {
            setFavorited(!Favorited);
          } else {
            Swal.fire({
              icon: "success",
              title: "Adicionado aos favoritos!",
              text: "O jogo foi adicionado à lista de favoritos com sucesso!",
              confirmButtonColor: "#f59f00",
            });
            setFavorited(!Favorited);
          }
        });
    }
  };

  return (
    <div>
      <button
        className="btn btn-warning border-rounded text-white mb-4"
        onClick={onClickFavorite}
      >
        {!Favorited ? " Add to Favorite " : " Remove from Favorite"}
      </button>
    </div>
  );
}

export default Favorite;
