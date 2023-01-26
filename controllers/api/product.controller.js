const { Product, Category, Sequelize } = require('../../models');

// get count product by category
const getCountProduct = async (req, res) => {
    const response = await Product.findAll({
        group: ['Product.categoryId'],
        attributes: ['Category.category', [Sequelize.fn('COUNT', 'Product.categoryId'), 'count']],
        include: [{attributes: ['category'], model: Category}]
    });

    res.status(200).json(response);
}

module.exports = {
    getCountProduct,
}