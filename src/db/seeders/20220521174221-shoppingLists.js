'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('shoppingLists', [
      {
        name: 'Lista1',
        listCategoryId: 1,
        familyId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Lista2',
        familyId: 1,
        listCategoryId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Favorita mensual',
        listCategoryId: 2,
        familyId: 2,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Compra marzo 2022',
        listCategoryId: 3,
        familyId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Stock',
        listCategoryId: 4,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Lista3',
        listCategoryId: 1,
        familyId: 2,
        createdAt: new Date,
        updatedAt: new Date,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('shoppingLists', null, {});

  }
};
