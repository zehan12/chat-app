const express = require("express");
const {
  registerAndCreateUser,
  loginUser,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", registerAndCreateUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;
