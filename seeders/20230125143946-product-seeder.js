'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [
      {
        categoryId: 1,
        productName: 'Dimsum Udang',
        description: 'lorem',
        price: 10000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 1,
        productName: 'Udang Keju',
        description: 'lorem',
        price: 9500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 1,
        productName: 'Hakao',
        description: 'lorem',
        price: 8000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 1,
        productName: 'Mie Ayam',
        description: 'lorem',
        price: 7000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 2,
        productName: 'Lemon Tea',
        description: 'lorem',
        price: 4000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 2,
        productName: 'Ice Tea',
        description: 'lorem',
        price: 3000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 2,
        productName: 'Red Velvet',
        description: 'lorem',
        price: 5000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 3,
        productName: 'Gulali',
        description: 'lorem',
        price: 2500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 3,
        productName: 'Agar-Agar',
        description: 'lorem',
        price: 3000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 3,
        productName: 'Apple Fruits',
        description: 'lorem',
        price: 4500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 3,
        productName: 'Roti Maryam',
        description: 'lorem',
        price: 3500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 3,
        productName: 'Cokelat Bat',
        description: 'lorem',
        price: 5500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    
  }
};
