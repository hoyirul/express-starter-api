const jwt = require("jsonwebtoken");
const config = require("./../config/auth.config");
const apiResponse = require("./../traits/api-response");

module.exports = {
  verifyToken: (req, res, next) => {
    let accessToken = req.headers.authorization;

    if (!accessToken) {
      return apiResponse.errors(res, { message: "No token provided!" }, 403);
    }

    // Mengecek format token bearer
    if (!accessToken.startsWith("Bearer ")) {
      return apiResponse.errors(res, { message: "Unauthorized." }, 401);
    }

    // Mengambil token saja (menghapus 'Bearer ' dari string)
    accessToken = accessToken.slice(7);

    jwt.verify(accessToken, config.secret, (err, decoded) => {
      if (err) {
        return apiResponse.errors(res, { message: "Unauthorized!" }, 401);
      }
      req.userId = decoded.id;
      next();
    });
  },

  isAdmin: (req, res, next) => {
    user.findByPk(req.userId).then((user) => {
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name == "admin") {
            next();
            return;
          }
        }

        return apiResponse.errors(res, { message: "Require Admin Role!" }, 403);
      });
    });
  },

  isModerator: (req, res, next) => {
    user.findByPk(req.userId).then((user) => {
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name == "moderator") {
            next();
            return;
          }
        }

        return apiResponse.errors(
          res,
          { message: "Require Moderator Role!" },
          403
        );
      });
    });
  },
};
