const moment = require('moment');
let datetime = moment().format('yyyy-MM-DD H:m:s');

module.exports = (sequelize, DataTypes) => {
    const Example = sequelize.define('Example', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        }
    }, {
        tableName: 'examples',
        underscored: true,
    });

    return Example;
}