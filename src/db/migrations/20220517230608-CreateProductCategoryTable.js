'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productCategory', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      category: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },

    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('productCategory');

  }
};
