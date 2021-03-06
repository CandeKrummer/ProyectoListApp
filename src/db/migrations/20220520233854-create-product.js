'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
      },

      brand: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true,
      },

      price: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
      },

      content: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },

      productCategoryId: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },

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
    await queryInterface.dropTable('Products');
  }
};