module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define("Page", {
    pag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pag_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pag_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pag_parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fk_prj_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'prj_id',
      }
    },
  }, {
    sequelize,
    modelName: "Page",
    tableName: "pages",
    indexes: [
      {
        unique: false,
        fields: ['fk_prj_id']
      },
      {
        unique: false, 
        fields: ['pag_parent'],
      }
    ]
  });

  // Autoreference to Page table
  Page.belongsTo(Page, {foreignKey: 'pag_parent', as: 'parent', onDelete: 'RESTRICT', onUpdate: 'CASCADE'});

  // Foreign key to Project table
  const Project = require('./Project')(sequelize, DataTypes);
  Page.belongsTo(Project, {foreignKey: 'fk_prj_id', as: 'project', onDelete: 'CASCADE', onUpdate: 'CASCADE'});

  return Page;
};
