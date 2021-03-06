'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let listaCategorias = [
      {
        category: 'Lista de Compras',
      },
      {
        category: 'Alacena Virtual',
      },
      {
        category: 'Compra favorita',
      },
      {
        category: 'Historial',
      },
      {
        category: 'Stock',
      }
    ]

    return queryInterface.bulkInsert('ShoppingListCategories', listaCategorias);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ShoppingListCategories', null, {});
  }
};
