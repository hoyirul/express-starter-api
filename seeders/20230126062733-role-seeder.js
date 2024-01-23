'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role: 'moderator',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', { role: 'admin' }, {
      
    });
  }
};
