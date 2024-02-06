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
      token = req.headers.authorization.split("Bearer")[1];
      const payload = await jwt.verify(token, config.jwt.secret);
      req.users = payload;
      next();
    } else {
      res.status(400).json({ error: "ACCESS: DENIED! (Token Required)" });
    }
  } catch (error) {
    return next(error);
  }
};

const optionalAuthentication = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split("Bearer")[1];
      const payload = await jwt.verify(token, config.jwt.secret);
      req.users = payload;
    } else {
      next();
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  verifyUserAuthentication,
  optionalAuthentication,
};
