'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('ShoppingLists', 'familyId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('ShoppingLists', 'familyId');

  }
};
