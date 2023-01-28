const { order, product, Sequelize } = require('./../../models');

// get count Order by category
const getCountProductByOrder = async (req, res) => {
    const response = await order.findAll({
        group: ['order.productId'],
        attributes: ['product.productName', [Sequelize.fn('COUNT', 'order.productId'), 'count']],
        include: [{attributes: ['productName'], model: product}]
    });

    res.status(200).json(response);
}

const getTotalOrderByYear = async (req, res) => {
    const response = await order.findAll({
        group: ['monthly'],
        attributes: [["DATE_FORMAT(order.orderDate, '%M %Y')", "monthly"], ['SUM(order.total)', 'total']],
        order: [
            ['monthly', 'DESC']
        ]
    });

    res.status(200).json(response);
}

module.exports = {
    getCountProductByOrder, getTotalOrderByYear
}