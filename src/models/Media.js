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
    med_alt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fk_prj_id: {
      type: DataTypes.INTEGER,
      allowNull: true,  // Permettre les valeurs NULL
      defaultValue: 1,
    },
  }, {
    sequelize,
    modelName: 'Media',
    tableName: 'medias',
  });

  Media.associate = (models) => {
    Media.belongsTo(models.Project, {
      foreignKey: 'fk_prj_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };

  return Media;
};
