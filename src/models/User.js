module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    usr_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    usr_username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usr_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fk_rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'rol_id'
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });

  // Foreign key to Role
  const Role = require('./Role')(sequelize, DataTypes);
  User.belongsTo(Role, {foreignKey: 'fk_rol_id', as: 'role'});

  return User;
};
