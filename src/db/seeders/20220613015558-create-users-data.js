'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Juan Garcia',
      familyId: 1,
      address: 'Juanito@mail.com',
      password: 'juanjuan',
      createdAt: new Date,
      updatedAt: new Date,
    },
    {
      name: 'Juana perez',
      familyId: 2,
      address: 'Juanu123@mail.com',
      password: 'listapp:)',
      createdAt: new Date,
      updatedAt: new Date,
    },], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});

  }
};
