'use strict';
var bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        name: "User Test",
        email: 'user@test.com',
        password: bcrypt.hashSync('password'),
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Admin Test",
        email: 'admin@test.com',
        password: bcrypt.hashSync('password'),
        role_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Moderator Test",
        email: 'mod@test.com',
        password: bcrypt.hashSync('password'),
        role_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', { email: 'admin@test.com' }, {

    });
  }
};
