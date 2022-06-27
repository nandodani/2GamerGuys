const favorites = require("../models/favorites.model");
const sequelize = require("../config/database");

const controllers = {};

sequelize
  .sync()
  .then(() => {
    console.log("Ligação efetuada: favorites");
  })
  .catch((error) => {
    console.log("Ocorreu um erro ao ligar à base de dados.");
  });

//=======================================================================================

controllers.getFavorited = async (req, res) => {
  try {
    const favorited = await favorites.findAll({
      where: { gameId: req.body.gameId, idUser: req.body.idUser },
    });
    let result = false;
    if (favorited.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, favorited: result });
  } catch (error) {
    console.log(error);
  }
};

//===================================================================================================

controllers.getFavorites = async (req, res) => {
  try {
    const favorite = await favorites.findAll({
      attributes: ["gameId", "gameTitle", "background"],
      where: { idUser: req.body.idUser },
    });
    res.json({ success: true, favorite: favorite });
  } catch (error) {
    console.log(error);
  }
};

//=================================================================================================

controllers.removeAllFavorites = async (req, res) => {
  const dados = await favorites
    .destroy({
      where: { idUser: req.body.idUser }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.status(200).json({
    sucess: true,
    deleted: dados,
    message: "Eliminado dos favoritos com sucesso.",
  });
};

//=================================================================================================

controllers.addFavorite = async (req, res) => {
  const { gameId, gameTitle, background, idUser } = req.body;

  const dados = await favorites
    .create({
      gameId: gameId,
      gameTitle: gameTitle,
      background: background,
      idUser: idUser,
    })
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log("Erro: " + error);
      return error;
    });
  res.status(200).json({
    sucess: true,
    message: "Adicionado aos favoritos",
    data: dados,
  });
};

//=================================================================================================

controllers.removeFromFavorite = async (req, res) => {
  const dados = await favorites
    .destroy({ where: { gameId: req.body.gameId, idUser: req.body.idUser } })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.status(200).json({
    sucess: true,
    deleted: dados,
    message: "Eliminado dos favoritos com sucesso.",
  });
};

module.exports = controllers;
