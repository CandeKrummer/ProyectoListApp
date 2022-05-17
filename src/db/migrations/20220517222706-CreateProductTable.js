'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.Datatypes.STRING(50),
        allowNull: true,
      },

      brand: {
        type: Sequelize.Datatypes.STRING(50),
        allowNull: true,
      },

      price: {
        type: Sequelize.Datatypes.INTEGER,
        allowNull: true,
      },

      category: {
        type: Sequelize.Datatypes.ENUM('Heladera', 'Alacena', 'Congelados'), //discutir nombres
        defaultValue: 'Alacena',
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.Datatypes.DATE,
        defaultValue: Sequelize.Datatypes.NOW,
      },

      updatedAt: {
        type: Sequelize.Datatypes.DATE,
        defaultValue: Sequelize.Datatypes.NOW,
      },
    });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
