const sequelize = require("sequelize");
const db = require("../config/database");
const favorites = require('./favorites.model');


var user = db.define(
  "user",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: sequelize.STRING,
    name: sequelize.STRING,
    lastname: sequelize.STRING,
    email: sequelize.STRING,
    password: sequelize.STRING,
    refresh_token: sequelize.TEXT
  },
  {
    timestamps: false,
    tableName: "user",
  }
);

user.hasOne(favorites, {foreignKey: 'idUser' });

module.exports = user;