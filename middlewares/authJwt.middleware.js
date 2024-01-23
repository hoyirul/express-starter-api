const jwt = require("jsonwebtoken");
const config = require("./../config/auth.config");

module.exports = {
  verifyToken: (req, res, next) => {
    let accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(403).json({
        message: "No token provided!"
      });
    }

    // Mengecek format token bearer
    if (!accessToken.startsWith('Bearer ')) {
      return res.status(401).json({
        message: "Invalid token format!"
      });
    }

    // Mengambil token saja (menghapus 'Bearer ' dari string)
    accessToken = accessToken.slice(7);

    jwt.verify(accessToken, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
  },

  isAdmin: (req, res, next) => {
    user.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name == "admin") {
            next();
            return;
          }
        }

        res.status(403).json({
          message: "Require Admin Role!"
        });
        return;
      });
    });
  },

  isModerator: (req, res, next) => {
    user.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name == "moderator") {
            next();
            return;
          }
        }

        res.status(403).json({
          message: "Require Moderator Role!"
        });
      });
    });
  },
}