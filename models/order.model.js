module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', { timestamps: false });
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'products'
                },
                key: 'id'
            }
        },
        order_date: {
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
    });

    Order.belongsTo(Product);

    return Order;
}