'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('shoppingLists', [
      {
        name: 'Lista1',
      },
      {
        name: 'Lista2',
      },
      {
        name: 'Favorita mensual',
      },
      {
        name: 'Compra marzo 2022',
      },
      {
        name: 'Lista3',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Lista4',
        createdAt: new Date,
        updatedAt: new Date,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('shoppingLists', null, {});

  }
};
