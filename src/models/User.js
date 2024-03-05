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
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });

  return User;
};