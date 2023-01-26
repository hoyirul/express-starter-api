const { Order, Product, Sequelize } = require('../../models');

// get count Order by category
const getCountProductByOrder = async (req, res) => {
    const response = await Order.findAll({
        group: ['Order.productId'],
        attributes: ['Product.productName', [Sequelize.fn('COUNT', 'Order.productId'), 'count']],
        include: [{attributes: ['productName'], model: Product}]
    });

    res.status(200).json(response);
}

const getTotalOrderByYear = async (req, res) => {
    const response = await Order.findAll({
        group: ['yearly'],
        attributes: [['YEAR(Order.orderDate)', 'yearly'], ['SUM(Order.total)', 'total']],
    });

    res.status(200).json(response);
}

module.exports = {
    getCountProductByOrder, getTotalOrderByYear
}