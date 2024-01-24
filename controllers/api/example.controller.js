const Validator = require("fastest-validator");
const { example } = require("./../../models");
const v = new Validator();
const apiResponse = require("./../../traits/api-response");

module.exports = {
  // for get all data from example table
  index: async (req, res) => {
    try{
      const response = await example.findAll();
    
      return apiResponse.success(res, response, 200);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  // for insert data to example table
  store: async (req, res) => {
    try{
      const schema = {
        name: "string",
        description: "string",
      };
    
      const validate = v.validate(req.body, schema);
    
      if (validate.length) {
        return apiResponse.errors(res, { message: validate }, 422);
      }
    
      const response = await example.create(req.body);
    
      return apiResponse.success(res, response, 201);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  // for get data by id from example table
  show: async (req, res) => {
    try{
      const id = req.params.id;
      const response = await example.findByPk(id);

      return apiResponse.success(res, response || {}, 200);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  // for update data from example table
  update: async (req, res) => {
    try{
      const id = req.params.id;
    
      let data = await example.findByPk(id);
    
      if (!data) {
        return apiResponse.errors(res, { message: "Data not found!" }, 404);
      }
    
      const schema = {
        name: "string|optional",
        description: "string|optional",
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

  // for delete data from example table
  destroy: async (req, res) => {
    try{
      const id = req.params.id;
      let data = await example.findByPk(id);
    
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
