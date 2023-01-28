'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      {
        category_name: 'Foods',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_name: 'Drinks',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_name: 'Dessert',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    
  }
};
