module.exports = (sequelize, DataTypes) => {
  const Component = sequelize.define(
    "Component",
    {
      cpn_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      cpn_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpn_allowChild: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      cpn_styleTemplate: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      cpn_classTemplate: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      cpn_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Component",
      tableName: "components",
    }
  );

  return Component;
};
