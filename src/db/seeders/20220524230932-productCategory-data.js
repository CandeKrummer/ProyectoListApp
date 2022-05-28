'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let listaCategorias = [
      {
        category: 'Alacena',
      },
      {
        category: 'Heladera',
      },
      {
        category: 'Congelados',
      }
    ]

    return queryInterface.bulkInsert('ProductCategories', listaCategorias);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductCategories', null, {});
  }
};
