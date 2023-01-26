module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', { timestamps: false });
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    }, {
        tableName: 'categories',
    });

    Category.hasMany(Product);

    return Category;
}