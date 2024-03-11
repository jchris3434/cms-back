module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define(
    "Content",
    {
      cnt_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      cnt_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cnt_styleTemplate: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      cnt_classTemplate: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      cnt_classTemplate: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      cnt_parent: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fk_med_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "medias",
          key: "med_id",
        },
      },
      fk_pag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "pages",
          key: "pag_id",
        },
      },
      fk_cpn_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "components",
          key: "cpn_id",
        },
      },
    },
    {
      sequelize,
      modelName: "Content",
      tableName: "contents",
    }
  );
  //autoreference to Content table
  Content.belongsTo(Content, { foreignKey: "cnt_parent", as: "parent" });
  // Foreign key to Media table
  const Media = require("./Media")(sequelize, DataTypes);
  Content.belongsTo(Media, { foreignKey: "fk_med_id", as: "media" });
  // Foreign key to Page table
  const Page = require("./Page")(sequelize, DataTypes);
  Content.belongsTo(Page, { foreignKey: "fk_pag_id", as: "page" });
  // Foreign key to Component table
  const Component = require("./Component")(sequelize, DataTypes);
  Content.belongsTo(Component, { foreignKey: "fk_cpn_id", as: "component" });

  return Content;
};
