'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let listaCategorias = [
      {
        category: 'Alacena',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Heladera',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Congelados',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return queryInterface.bulkInsert('ProductCategories', listaCategorias);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductCategories', null, {});
  }
};
