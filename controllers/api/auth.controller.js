const Validator = require('fastest-validator');
const { role, user } = require('./../../models');
const v = new Validator();
const apiResponse = require("./../../traits/api-response");

const config = require("./../../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = {
  signup: (req, res) => {
    try{
      // validation
      const schema = {
        name: { type: "string", empty: false },
        email: { type: "email", empty: false },
        password: { type: "string", empty: false },
        roles: { type: "string", empty: false }
      }

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return apiResponse.errors(res, { message: validate }, 422);
      }

      // Save User to Database
      user.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role_id: req.body.roles
      }).then(users => {
        return apiResponse.success(res, {
          message: "User was registered successfully!"
        }, 200);
      }).catch(err => {
        return apiResponse.errors(res, { message: err.message }, 500);
      });
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  signin: (req, res) => {
    // validation
    const schema = {
      email: { type: "email", empty: false },
      password: { type: "string", empty: false }
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return apiResponse.errors(res, { message: validate }, 422);
    }

    user.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (!user) {
        return apiResponse.errors(res, { message: "User Not found." }, 404);
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return apiResponse.errors(res, { message: "Invalid Password!" }, 401);
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      role.findOne({
        where: {
          id: user.roleId
        }
      }).then(roles => {
        authorities.push("ROLE_" + roles.role.toUpperCase());
        return apiResponse.success(res, {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: authorities,
          token_type: 'Bearer',
          access_token: token
        }, 200);
      });
    }).catch(err => {
      return apiResponse.errors(res, { message: err.message }, 500);
    });
  },

  signout: async (req, res) => {
    try {
      const bearerHeader = req.headers["authorization"];
      if (!bearerHeader) {
        return apiResponse.errors(res, { message: "No token provided." }, 401);
      }
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];

      if (!token) {
        return apiResponse.errors(res, { message: "Unauthorized" }, 401);
      }

      const decoded = jwt.verify(token, config.secret);
      const data = decoded;
      const users = await user.findOne({ where: { token: token, email: data.email } });

      if (user === null) {
        return apiResponse.errors(res, { message: "Unauthorized" }, 401);
      }

      await users.update({ token: "", updated_at: new Date() });

      return apiResponse.success(res, {
        token: null,
        logged_in: false,
        user: users,
        message: "Sign Out Success!"
      }, 200);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  // for get all data from examples table
  index: async (req, res) => {
    const response = await User.findAll({include: role});

    return apiResponse.success(res, {
      data: response
    }, 200);
  }
};