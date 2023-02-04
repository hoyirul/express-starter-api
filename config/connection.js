const Sequelize = require('sequelize');
require('dotenv').config();

const {
    DB_ENERGY_USERNAME,
    DB_ENERGY_PASSWORD,
    DB_ENERGY_NAME,
    DB_UTIL_USERNAME,
    DB_UTIL_PASSWORD,
    DB_UTIL_NAME,
    DB_HOST,
    DB_DIALECT,
} = process.env;

const energyDB = new Sequelize(DB_ENERGY_NAME, DB_ENERGY_USERNAME, DB_ENERGY_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false
});

const utilDB = new Sequelize(DB_UTIL_NAME, DB_UTIL_USERNAME, DB_UTIL_PASSWORD, {
    host: DB_HOST, 
    dialect: DB_DIALECT,
    logging: false
});

module.exports = { energyDB, utilDB };