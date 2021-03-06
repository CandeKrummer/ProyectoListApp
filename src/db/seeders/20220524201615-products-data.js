'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    let listaProductos = [
      {
        name: 'Aceite Girasol',
        brand: 'Alsamar',
        price: 256.35,
        content: "1.5 lt",
        productCategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Agua Mineral Sin Gas',
        brand: 'Eco de los Andes',
        price: 73.50,
        content: "500 ml",
        productCategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alfajor Chocolate',
        brand: 'Jorgito',
        price: 191.16,
        content: "6 unidades",
        productCategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Arroz Integral',
        brand: 'Gallo',
        price: 202.36,
        content: "1 kg",
        productCategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cereales Copos de Maíz con Azúcar',
        brand: 'Zucaritas',
        price: 201.34,
        content: "500 gr",
        productCategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Crema de Leche Clásica',
        brand: 'La Serenísima',
        price: 344.53,
        content: "520 cc",
        productCategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fideos Coditos',
        brand: 'Marolio',
        price: 74.31,
        content: "500 gr",
        productCategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Galletitas Dulces Clásicas',
        brand: 'Chocolina',
        price: 71.47,
        content: "100 gr",
        productCategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Muzzarella',
        brand: 'La Paulina',
        price: 924.38,
        content: "1 kg",
        productCategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mayonesa',
        brand: 'Natura',
        price: 273.08,
        content: "950 gr",
        productCategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Azucar',
        brand: 'Domino',
        price: 79.17,
        content: "1 kg",
        productCategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Budin de Vainilla',
        brand: '9 de Oro',
        price: 109.07,
        content: "220 gr",
        productCategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Yogur Bebible Vainilla',
        brand: 'Yogs',
        price: 208.12,
        content: "900 gr",
        productCategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Salchichas',
        brand: 'Vienissima',
        price: 245.79,
        content: "450 gr",
        productCategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sal Fina',
        brand: 'Dos Anclas',
        price: 221.39,
        content: "500 gr",
        productCategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ricota Magra',
        brand: 'Tregar',
        price: 199.59,
        content: "300 gr",
        productCategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Queso Rallado',
        brand: 'Armonia',
        price: 202.15,
        content: "120 gr",
        productCategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Leche Entera',
        brand: 'La Serenisima',
        price: 125.36,
        content: "1 lt",
        productCategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Helado de Palitos Frutilla',
        brand: 'Torpedo',
        price: 437.87,
        content: "300 gr",
        productCategoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    return queryInterface.bulkInsert('Products', listaProductos);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
