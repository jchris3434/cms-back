module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    med_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    med_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    med_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    med_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fk_prj_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Media',
    tableName: 'medias'
  });

  const Project = require('./Project')(sequelize, DataTypes);

  // Définition de la relation avec Project
  Media.belongsTo(Project, { foreignKey: 'fk_prj_id' });

  return Media;
};
