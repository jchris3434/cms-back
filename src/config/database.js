const Sequelize = require("sequelize");

// Connect to the database
const sequelize = new Sequelize(
    'test',
    'root',
    '',
     {
       host: 'localhost',
       dialect: 'mysql'
     }
   );
   
   sequelize.authenticate().then(() => {
       console.log('You\'re connected to the DB !');
    }).catch((error) => {
       console.error('Unable to connect to the DB : ', error);
    });