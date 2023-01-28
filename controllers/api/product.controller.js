const { product, category, Sequelize } = require('./../../models');

// get count product by category
const getCountProduct = async (req, res) => {
    const response = await product.findAll({
        group: ['product.categoryId'],
        attributes: ['category.category_name', [Sequelize.fn('COUNT', 'product.categoryId'), 'count']],
        include: [{attributes: ['category_name'], model: category}]
    });

    res.status(200).json(response);
}

module.exports = {
    getCountProduct,
}