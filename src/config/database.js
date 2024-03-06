// Importation environnement variables
require('dotenv').config();

// Environnement variables for database connection
const dbname = process.env.DBNAME;
const dbusername = process.env.DBUSERNAME;
const dbpassword = process.env.DBPASSWORD;
const dbhost = process.env.DBHOST;
const port = process.env.PORT;


console.log(dbname, dbusername, dbhost);

// Sequelize importation
const Sequelize = require("sequelize");

// Seqsuelize instance creation
const sequelize = new Sequelize(dbname, dbusername, dbpassword,{
  host: dbhost,
  dialect: "mysql",
  logging: console.log,
});

// User model importation
const User = require("../models/User")(sequelize, Sequelize.DataTypes);

function databaseConnection() {
  sequelize.sync().then(() => {
    console.log('Connexion à la base de données réussie et modèles synchronisés.');
  }).catch(err => {
    console.error('Erreur lors de la synchronisation avec la base de données:', err);
  });
}

module.exports = { sequelize, databaseConnection };
