const { user } = require("./../models");
const ROLES = ['admin', 'moderator', 'user'];

checkDuplicateEmail = (req, res, next) => {
    // Email
    user.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            return res.status(400).json({
                message: "Failed! Email is already in use!"
            });
        }
        next();
    });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;