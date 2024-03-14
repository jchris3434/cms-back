module.exports = (sequelize, DataTypes) => {
    const Access = sequelize.define(
      "Access",
      {
        acs_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        fk_prj_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references : {
            model: 'projects',
            key: 'prj_id'
          }
        },
        fk_usr_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references : {
            model: 'users',
            key: 'usr_id'
          }
        },
      },
      {
        sequelize,
        modelName: "Access",
        tableName: "accesses",
        indexes: [
          {
            unique: false,
            fields: ['fk_prj_id'],
          },
          {
            unique: false,
            fields: ['fk_usr_id'],
          }
        ]
      }
    );
    
    // Foreign key to Project table
    const Project = require('./Project')(sequelize, DataTypes);
    Access.belongsTo(Project, {foreignKey: 'fk_prj_id', as: 'project', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    // Foreign key to User table
    const User = require('./User')(sequelize, DataTypes);
    Access.belongsTo(User, {foreignKey: 'fk_usr_id', as: 'user', onDelete: 'CASCADE', onUpdate: 'CASCADE'});

    return Access;
};
