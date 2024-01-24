const { Op } = require("sequelize");
const { order, product, Sequelize } = require("./../../models");
const apiResponse = require("./../../traits/api-response");

module.exports = {
  // get count Order by category
  getCountProductByOrder: async (req, res) => {
    try{
      const response = await order.findAll({
        group: ["order.productId"],
        attributes: [
          "product.productName",
          [Sequelize.fn("COUNT", "order.productId"), "count"],
        ],
        include: [{ attributes: ["productName"], model: product }],
      });
    
      return apiResponse.success(res, response, 200);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  getTotalOrderByYear: async (req, res) => {
    try{
      const response = await order.findAll({
        group: ["monthly"],
        attributes: [
          ["DATE_FORMAT(order.orderDate, '%M %Y')", "monthly"],
          ["SUM(order.total)", "total"],
        ],
        order: [["monthly", "DESC"]],
      });
    
      return apiResponse.success(res, response, 200);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  paginationTest: (req, res) => {
    try{
      const { page, size, productId } = req.query;
      // var condition = productId ? { productId: { [Op.like]: `%${productId}%` } } : null;

      const { limit, offset } = getPagination(page, size);

      order
        .findAndCountAll({
          limit,
          offset,
          attributes: ["id", "order_date", "total", "status"],
        })
        .then((data) => {
          const response = getPagingData(data, page, limit);
          return apiResponse.success(res, response, 200);
        })
        .catch((err) => {
          return apiResponse.errors(res, { message: err.message }, 500);
        }); 
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  orderGroupDynamic: async (req, res) => {
    try {
      const tahun = req.body.year || req.query.year;
      const awal = tahun + "-01-01";
      const akhir = tahun + "-12-31";
      const response = await order.findAll({
        group: ["year"],
        attributes: [
          ["YEAR(orderDate)", "year"],
          ["SUM(total)", "total"],
        ],
        where: { orderDate: { [Op.between]: [awal, akhir] } },
      });

      return apiResponse.success(res, response, 200);
    } catch (error) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  orderAll: async (req, res) => {
    try {
      const response = await order.findAll({
        group: ["year"],
        attributes: [
          ["YEAR(orderDate)", "year"],
          ["SUM(total)", "total"],
        ],
      });

      return apiResponse.success(res, response, 200);
    } catch (error) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },
};
