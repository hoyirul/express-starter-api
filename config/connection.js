const { Sequelize } = require('sequelize');
const config = require('./config');

const db = (database) => {
  const server = {
    database: config[database].database,
    username: config[database].username,
    password: config[database].password,
    config: config[database]
  };

  return new Sequelize(server.database, server.username, server.password, server.config);
}

// MYSQL
// Server Local
module.exports = {
  checkDatabaseConnection: async (sequelize) => {
    try {
      await sequelize.authenticate();
      console.log('Database connected successfully.');
    } catch (error) {
      console.error('Error connecting to database:', error.message);
    }
  },

  db_dev: db('development'),
  db_test: db('test'),
  db_prod: db('production'),
  your_other_db: db('your_other_database')
};