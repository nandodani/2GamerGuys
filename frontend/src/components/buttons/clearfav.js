import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

function Clear(props) {
  const idUser = props.idUser;

  const onClickFavorite = () => {
    axios
      .post("http://localhost:5001/api/favorites/removeallfavorites", idUser)
      .then((response) => {
        if (response.data.success) {
        } else {
          Swal.fire({
            icon: "warning",
            title: "Tens a certeza que queres eliminar a lista?",
            text: "Atenção, não é possível recuperar os jogos apagados desta lista!",
            showCancelButton: true,
            confirmButtonColor: "#f59f00",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, é para apagar!",
            cancelButtonText: "Não, mantém os dados.",
          });
        }
      });
  };

  return (
    <div>
      <button
        className="btn btn-danger border-rounded"
        onClick={onClickFavorite}
      >
        Limpar lista!
      </button>
    </div>
  );
}

export default Clear;
