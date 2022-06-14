'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let familias = [
      {
        name:"Familia Lopez",
        address: "Yatay 240",
        number: "65583252",
        password:"lopez123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Los Ramirez",
        address:"Bogota 520",
        number:"65423321",
        password:"ramirez123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Flia Diaz",
        address:"Hidalgo 222",
        number:"63305522",
        password:"diaz123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Familia Gomez",
        address:"Yerbal 996",
        number:"66958788",
        password:"gomez123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Flia Perez",
        address:"Av Directorio 985",
        number:"64452589",
        password:"perez123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    return queryInterface.bulkInsert('Families', familias);
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Families', null, {});

  }
};
