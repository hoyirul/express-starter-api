'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('orders', [
      {
        productId: 1,
        orderDate: '2022-11-01',
        total: 10000,
        status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        orderDate: '2022-12-01',
        total: 13500,
        status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        orderDate: '2022-12-01',
        total: 9000,
        status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 1,
        orderDate: '2022-12-01',
        total: 10000,
        status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        orderDate: '2022-10-01',
        total: 11500,
        status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        orderDate: '2022-10-01',
        total: 12000,
        status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 1,
        orderDate: '2022-11-01',
        total: 10000,
        status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        orderDate: '2022-12-01',
        total: 13500,
        status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        orderDate: '2022-01-01',
        total: 4000,
        status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        orderDate: '2022-01-01',
        total: 8000,
        status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 8,
        orderDate: '2022-10-01',
        total: 11500,
        status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 5,
        orderDate: '2023-01-01',
        total: 5000,
        status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    
  }
};
