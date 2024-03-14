module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      rol_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
    }
  );

  return Role;
};
