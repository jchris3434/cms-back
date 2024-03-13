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
      cnt_parent: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fk_med_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      indexes: [
        {
          unique: false,
          fields: ["fk_med_id"],
        },
        {
          unique: false,
          fields: ["fk_pag_id"],
        },
        {
          unique: false,
          fields: ["fk_cpn_id"],
        },
        {
          unique: false,
          fields: ["cnt_parent"],
        },
      ],
    }
  );

  //autoreference to Content table
  Content.belongsTo(Content, { foreignKey: "cnt_parent", as: "parent", onDelete: 'CASCADE', onUpdate: 'CASCADE'});
  // Foreign key to Media table
  const Media = require("./Media")(sequelize, DataTypes);
  Content.belongsTo(Media, { foreignKey: "fk_med_id", as: "media", onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
  // Foreign key to Page table
  const Page = require("./Page")(sequelize, DataTypes);
  Content.belongsTo(Page, { foreignKey: "fk_pag_id", as: "page", onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  // Foreign key to Component table
  const Component = require("./Component")(sequelize, DataTypes);
  Content.belongsTo(Component, { foreignKey: "fk_cpn_id", as: "component", onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

  return Content;
};
