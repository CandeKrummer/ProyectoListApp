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
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },

      // listCategoryId: {
      //   type: Sequelize.INTEGER,
      //   defaultValue: 1,
      //   allowNull: false,
      // },

      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },

      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shoppingList');

  }
};
