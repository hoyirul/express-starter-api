const { Op } = require('sequelize');
const { order, product, Sequelize, sequelize } = require('./../../models');

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

const paginationTest = (req, res) => {
    const { page, size, productId } = req.query;
    // var condition = productId ? { productId: { [Op.like]: `%${productId}%` } } : null;

    const { limit, offset } = getPagination(page, size);

    order.findAndCountAll({ limit, offset, attributes: ['id', 'order_date', 'total', 'status'] })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}

const orderGroupDynamic = async (req, res) => {
    try{
        const tahun = req.body.tahun || req.query.tahun;
        const awal = tahun + "-01-01";
        const akhir = tahun + "-12-31";
        const response = await order.findAll({
            group: ["year"],
            attributes: [["YEAR(orderDate)", "month"], ["SUM(total)", "total"]],
            where: { bulan: { [Op.between]: [awal, akhir] } }
        });

        return res.status(201).json(response);
    }catch(error){
        return res.status(500).json({
            error: error.message 
        });
    }
}

module.exports = {
    getCountProductByOrder, getTotalOrderByYear, paginationTest, orderGroupDynamic
}