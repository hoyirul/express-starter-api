const { product, category, Sequelize } = require("./../../models");
const apiResponse = require("./../../traits/api-response");

module.exports = {
  // get count product by category
  getCountProduct: async (req, res) => {
    try{
      const response = await product.findAll({
        group: ["product.categoryId"],
        attributes: [
          "category.category_name",
          [Sequelize.fn("COUNT", "product.categoryId"), "count"],
        ],
        include: [{ attributes: ["category_name"], model: category }],
      });
  
      return apiResponse.success(res, response, 200);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },
};
