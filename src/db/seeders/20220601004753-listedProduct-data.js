'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let productosListados = [
      {
        shoppingListId: 1,
        productId: 1,
        cantidad: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        shoppingListId: 1,
        productId: 2,
        cantidad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        shoppingListId: 1,
        productId: 3,
        cantidad: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        shoppingListId: 1,
        productId: 4,
        cantidad: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        shoppingListId: 5,
        productId: 1,
        cantidad: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        shoppingListId: 5,
        productId: 2,
        cantidad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        shoppingListId: 5,
        productId: 3,
        cantidad: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        shoppingListId: 5,
        productId: 4,
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
