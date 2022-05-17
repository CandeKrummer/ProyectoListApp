'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shoppingList', {

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

      category: {
        type: Sequelize.Datatypes.ENUM('stock, currentShoppingList, usedList, favouriteList'), //discutir nombres
        defaultValue: 'currentShoppingList',
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
