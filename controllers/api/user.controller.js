const {
  getPagingData,
  getPagination,
} = require("../../middlewares/pagination.middleware");
const { user } = require("./../../models");
const apiResponse = require("./../../traits/api-response");

module.exports = {
  // for get all data from user table
  index: async (req, res) => {
    try{
      const response = await user.findAll({
        attributes: [
          "id",
          "name",
          "email",
          "password",
          "role_id",
          "created_at",
          "updated_at",
        ],
      });
  
      return apiResponse.success(res, response, 200);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  paginationTestUsers: async (req, res) => {
    try{
      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);

      await user
        .findAndCountAll({
          limit,
          offset,
          attributes: ["id", "name", "email", "role_id", "created_at"],
        })
        .then((data) => {
          const response = getPagingData(page, limit, data);
          return apiResponse.success(res, response, 200);
        })
        .catch((err) => {
          return apiResponse.errors(res, { message: err.message }, 500);
        });
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },
};
