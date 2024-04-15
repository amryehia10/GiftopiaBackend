const jwt = require("../node_modules/jsonwebtoken");
const { JWT: JWTCongig } = require("../config.json");

class AuthMiddleware {
  static verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }
    console.log(token);

    jwt.verify(token, JWTCongig.secretKey, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Failed to authenticate token!" , err:err});
      }
      // add a user to the request;
      req.user = decoded;
      next();
    });
  }

  static isAdmin(req, res, next) {
    AuthMiddleware.verifyToken(req, res, () => {
      if (req.user.userType !== "admin") {
        return res.status(403).json({ message: "Unauthorized access!" });
      }
      next();
    });
  }

  static isCustomer(req, res, next) {
    AuthMiddleware.verifyToken(req, res, () => {
      if (req.user.userType !== "customer") {
        return res.status(403).json({ message: "Unauthorized access!" });
      }
      next();
    });
  }
}

module.exports = AuthMiddleware;
