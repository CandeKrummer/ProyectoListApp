'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    let listaProductos = [
      {
        name: 'Aceite Girasol',
        brand: 'Alsamar',
        price: 256.35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Agua Mineral Sin Gas',
        brand: 'Eco de los Andes',
        price: 73.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alfajor Chocolate',
        brand: 'Jorgito',
        price: 191.16,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Arroz Integral',
        brand: 'Gallo',
        price: 202.36,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cereales Copos de Maíz con Azúcar',
        brand: 'Zucaritas',
        price: 201.34,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Crema de Leche Clásica',
        brand: 'La Serenísima',
        price: 344.53,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fideos Coditos',
        brand: 'Marolio',
        price: 74.31,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Galletitas Dulces Clásicas',
        brand: 'Chocolina',
        price: 71.47,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Muzzarella',
        brand: 'La Paulina',
        price: 924.38,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    return queryInterface.bulkInsert('Products', listaProductos);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
