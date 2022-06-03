'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let productosListados = [
      {
        shoppingListId: 1,
        productId: 28,
        cantidad: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        shoppingListId: 1,
        productId: 29,
        cantidad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        shoppingListId: 1,
        productId: 30,
        cantidad: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        shoppingListId: 1,
        productId: 31,
        cantidad: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    return queryInterface.bulkInsert('ListedProducts', productosListados);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ListedProducts', null, {});
  }
};
