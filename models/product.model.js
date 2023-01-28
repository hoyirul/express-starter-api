module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', { timestamps: false });
    const Order = sequelize.define('order', { timestamps: false });
    const Product = sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'categories'
                },
            key: 'id'
        }
        },
        productName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'productName'
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        tableName: 'products',
    });

    Product.belongsTo(Category);
    Product.hasMany(Order);

    return Product;
}