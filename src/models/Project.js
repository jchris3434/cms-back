module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    prj_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    prj_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prj_prod: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
  });

  Project.associate = (models) => {
    Project.hasMany(models.Media, {
      foreignKey: 'fk_prj_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };

  return Project;
};
