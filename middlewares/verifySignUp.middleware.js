const { user } = require("./../models");
const ROLES = ["admin", "moderator", "user"];
const apiResponse = require("./../traits/api-response");

checkDuplicateEmail = (req, res, next) => {
  // Email
  user
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((user) => {
      if (user) {
        return apiResponse.errors(
          res,
          { message: "Failed! Email is already in use!" },
          422
        );
      }
      next();
    });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return apiResponse.errors(
          res,
          { message: `Failed! Role ${req.body.roles[i]} does not exist!` },
          422
        );
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
