module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', { timestamps: false });
    const Category = sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'category_name'
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