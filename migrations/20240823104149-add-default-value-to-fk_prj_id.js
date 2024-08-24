module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('medias', 'fk_prj_id', {
      type: Sequelize.INTEGER,
      allowNull: true,  // ou false, selon vos besoins
      defaultValue: 1,  // Valeur par défaut
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('medias', 'fk_prj_id', {
      type: Sequelize.INTEGER,
      allowNull: true,  // Assurez-vous que cela correspond à l'état précédent
      defaultValue: null,  // Supprimer la valeur par défaut si vous annulez
    });
  }
};
