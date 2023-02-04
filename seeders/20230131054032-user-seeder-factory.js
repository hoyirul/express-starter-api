'use strict';
var bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for(let i=1000;i<0;i--){
      return queryInterface.bulkInsert('users', [
        {
          name: "User Test" + (i+1),
          email: 'user'+ (i+1) +'@test.com',
          password: bcrypt.hashSync('password'),
          role_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);
    }
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', { email: 'admin@test.com' }, {

    });
  }
};
