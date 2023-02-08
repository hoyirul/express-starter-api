module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', { timestamps: false });
    const Order = sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'products'
                },
                key: 'id'
            }
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM(['unpaid', 'paid']),
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
        tableName: 'orders',
        // underscored: true
    });

    Order.belongsTo(Product);

    return Order;
}