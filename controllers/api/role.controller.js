const Validator = require("fastest-validator");
const { QueryTypes } = require("sequelize");
const { role } = require("./../../models");
const db = require("./../../models");
const v = new Validator();
const apiResponse = require("./../../traits/api-response");

module.exports = {
  // for get all data from role table
  index: async (req, res) => {
    try{
      const response = await db.sequelize.query("SELECT * FROM roles", {
        type: QueryTypes.SELECT,
      });
      return apiResponse.success(res, response, 200);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  // for insert data to role table
  store: async (req, res) => {
    try{
      const schema = {
        role: "string",
      };
  
      const validate = v.validate(req.body, schema);
  
      if (validate.length) {
        return apiResponse.errors(res, { message: validate }, 422);
      }
  
      await role.create(req.body);
  
      return apiResponse.success(res, {
        message: "Role was created successfully!"
      }, 201);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  // for get data by id from role table
  show: async (req, res) => {
    try{
      const id = req.params.id;
      const response = await role.findByPk(id, {
        attributes: ["id", "role", "created_at", "updated_at"],
      });
  
      if (!response) {
        return apiResponse.errors(res, { message: "Data not found!" }, 404);
      } else {
        return apiResponse.success(res, response || {}, 200);
      }
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  // for update data from role table
  update: async (req, res) => {
    try{
      const id = req.params.id;
  
      let data = await role.findByPk(id, {
        attributes: ["id", "role", "created_at", "updated_at"],
      });
  
      if (!data) {
        return apiResponse.errors(res, { message: "Data not found!" }, 404);
      }
  
      const schema = {
        role: "string|optional",
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

  // for delete data from role table
  destroy: async (req, res) => {
    try{
      const id = req.params.id;
      let data = await role.findByPk(id);
  
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
