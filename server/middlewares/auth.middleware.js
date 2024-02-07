const jwt = require("jsonwebtoken");
const User = require("../models/user.schema");
const config = require("../config/config");

const verifyUserAuthentication = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split("Bearer")[1].trim();
      const payload = await jwt.verify(token, config.jwt.secret);
      req.user = payload;
      next();
    } else {
      res.status(401).json({ error: "ACCESS: DENIED! (Token Required)" });
    }
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

const optionalAuthentication = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split("Bearer")[1].trim();
      const payload = await jwt.verify(token, config.jwt.secret);
      req.user = payload;
      return next();
    } else {
      return next();
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  verifyUserAuthentication,
  optionalAuthentication,
};
