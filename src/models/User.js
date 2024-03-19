const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

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
      allowNull: false,
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, SALT_ROUNDS);
        this.setDataValue('usr_password', hashedPassword);
      }
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
    tableName: 'users',
    indexes: [
      {
        unique: false,
        fields: ['fk_rol_id']
      }
    ]
  });

  // Foreign key to Role
  const Role = require('./Role')(sequelize, DataTypes);
  User.belongsTo(Role, {foreignKey: 'fk_rol_id', as: 'role', onDelete: 'RESTRICT', onUpdate: 'CASCADE'});
  return User;
};
