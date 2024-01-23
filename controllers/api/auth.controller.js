const Validator = require('fastest-validator');
const { role, user } = require('./../../models');
const v = new Validator();

const config = require("./../../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = {
  signup: (req, res) => {
    // validation
    const schema = {
      name: { type: "string", empty: false },
      email: { type: "email", empty: false },
      password: { type: "string", empty: false },
      roles: { type: "string", empty: false }
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        message: validate
      });
    }

    // Save User to Database
    user.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    })
      .then(users => {
        if (req.body.roles) {
          role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          }).then(roles => {
            users.setRoles(roles).then(() => {
              return res.status(200).json({ message: "User was registered successfully!" });
            });
          });
        } else {
          // user role = 1
          users.setRoles([1]).then(() => {
            return res.status(200).json({ message: "User was registered successfully!" });
          });
        }
      })
      .catch(err => {
        return res.status(500).json({ message: err.message });
      });
  },

  signin: (req, res) => {
    // validation
    const schema = {
      email: { type: "email", empty: false },
      password: { type: "string", empty: false }
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        message: validate
      });
    }

    user.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (!user) {
        return res.status(404).json({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).json({
          accessToken: null,
          message: "Invalid Password!"
        });
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
        return res.status(200).json({
          id: user.id,
          name: user.name,
          email: user.email,
          roles: authorities,
          token_type: 'Bearer',
          access_token: token
        });
      });
    }).catch(err => {
      return res.status(500).json({ message: err.message });
    });
  },

  signout: async (req, res) => {
    try {
      const bearerHeader = req.headers["authorization"];
      if (!bearerHeader) {
        return apiResponse.errors(res, { message: "No token provided!" }, 401);
      }
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];

      if (!token) {
        return apiResponse.errors(res, { message: "Unauthorized" }, 401);
      }

      const decoded = jwt.verify(token, config.secret);
      const data = decoded;
      const user = await User.findOne({ where: { token: token, email: data.email } });

      if (user === null) {
        return apiResponse.errors(res, { message: "Unauthorized" }, 401);
      }

      await user.update({ token: "", updated_at: new Date() });

      return apiResponse.success(res, {
        token: null,
        logged_in: false,
        user: user,
        message: "Sign Out Success!"
      }, 200);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  // for get all data from examples table
  index: async (req, res) => {
    const response = await User.findAll({include: Role});

    res.status(200).json({
      message: true,
      data: response
    });
  }
};