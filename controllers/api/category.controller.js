const Validator = require("fastest-validator");
const { category } = require("./../../models");
const v = new Validator();
const apiResponse = require("./../../traits/api-response");

module.exports = {
  // for get all data from Categorys table
  index: async (req, res) => {
    try {
      const response = await category.findAll();

      return apiResponse.success(res, response, 200);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  // for insert data to Categorys table
  store: async (req, res) => {
    try{
      const schema = {
        category: "string",
      };
    
      const validate = v.validate(req.body, schema);
    
      if (validate.length) {
        return apiResponse.errors(res, { message: validate }, 422);
      }
    
      const response = await category.create(req.body);
    
      return apiResponse.success(res, response, 201);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  // for get data by id from Categorys table
  show: async (req, res) => {
    try{
      const id = req.params.id;
      const response = await category.findByPk(id);
    
      if (!response) {
        return apiResponse.errors(res, { message: "Data not found!" }, 404);
      } else {
        return apiResponse.success(res, response || {}, 200);
      }
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  // for update data from Categorys table
  update: async (req, res) => {
    try{
      const id = req.params.id;

      let data = await category.findByPk(id);

      if (!data) {
        return apiResponse.errors(res, { message: "Data not found!" }, 404);
      }

      const schema = {
        category: "string|optional",
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return apiResponse.errors(res, { message: validate }, 422);
      }

      const response = await data.update(req.body);

      return apiResponse.success(res, response, 200);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  // for delete data from Categorys table
  destroy: async (req, res) => {
    try{
      const id = req.params.id;
      let data = await category.findByPk(id);
    
      if (!data) {
        return apiResponse.errors(res, { message: "Data not found!" }, 404);
      }
    
      await data.destroy(id);
    
      return apiResponse.success(res, { message: "Data was deleted!" }, 200);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },
  
};
