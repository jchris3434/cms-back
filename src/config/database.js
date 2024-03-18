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
// Project model importation
const Project = require("../models/Project")(sequelize, Sequelize.DataTypes);
// Component model importation
const Component = require("../models/Component")(sequelize, Sequelize.DataTypes);
// Page model importation
const Page = require("../models/Page")(sequelize, Sequelize.DataTypes);
// Media model importation
const Media = require("../models/Media")(sequelize, Sequelize.DataTypes);
// Role model importation
const Role = require("../models/Role")(sequelize, Sequelize.DataTypes);
// Content model importation
const Content = require("../models/Content")(sequelize, Sequelize.DataTypes);
// Access model importation
const Access = require("../models/Access")(sequelize, Sequelize.DataTypes);


async function databaseConnection() {
  try {
    await sequelize.sync();
    console.log('Connexion à la base de données réussie et modèles synchronisés.');
  } catch (err) {
    console.error('Erreur lors de la synchronisation avec la base de données:', err);
  }
}


module.exports = { Sequelize, sequelize, databaseConnection };
