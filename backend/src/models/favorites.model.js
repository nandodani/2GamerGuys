const sequelize = require("sequelize");
const db = require("../config/database");


var favorites = db.define(
  "favorites",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gameId: {
      type: sequelize.STRING,
      allowNull: false

    },
    gameTitle: {
      type:sequelize.STRING,
      allowNull: false
    },
    background: {
      type:sequelize.STRING,
      allowNull: false}
  },
  {
    timestamps: false,
    tableName: "favorites",
  }
);


module.exports = favorites;
