'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('shoppingLists', [
      {
        name: 'Favorita mensual',
        listCategoryId: 3,
        familyId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Compra marzo 2022',
        listCategoryId: 4,
        familyId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Stock',
        listCategoryId: 5,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Lista de Compras',
        listCategoryId: 1,
        familyId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Alacena Virtual',
        listCategoryId: 2,
        familyId: 1,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Lista de Compras',
        listCategoryId: 1,
        familyId: 2,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Alacena Virtual',
        listCategoryId: 2,
        familyId: 2,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Lista de Compras',
        listCategoryId: 1,
        familyId: 3,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Alacena Virtual',
        listCategoryId: 2,
        familyId: 3,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Lista de Compras',
        listCategoryId: 1,
        familyId: 4,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Alacena Virtual',
        listCategoryId: 2,
        familyId: 4,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Lista de Compras',
        listCategoryId: 1,
        familyId: 5,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Alacena Virtual',
        listCategoryId: 2,
        familyId: 5,
        createdAt: new Date,
        updatedAt: new Date,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('shoppingLists', null, {});

  }
};
