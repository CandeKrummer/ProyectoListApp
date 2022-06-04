'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('productMeassures', [
      {
        meassure: 'unidades',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        meassure: 'ml',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        meassure: 'lt',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        meassure: 'gr',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        meassure: 'kg',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        meassure: 'cc',
        createdAt: new Date,
        updatedAt: new Date,
      },
    ])

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('productMeassures', null, {});

  }
};
