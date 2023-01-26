'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      {
        category: 'Foods',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Drinks',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Dessert',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    
  }
};
