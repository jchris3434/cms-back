const Sequelize = require("sequelize");
const sequelize = new Sequelize("blabla", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
});
const User = require("../models/User")(sequelize, Sequelize.DataTypes);
const db = {
  sequelize,
  Sequelize,
  User
};

module.exports = db;
