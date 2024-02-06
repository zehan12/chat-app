const express = require("express");
const { getUsers, getAllUser } = require("../controllers/user.controller");
const {
  verifyUserAuthentication,
  optionalAuthentication,
} = require("../middlewares/auth.middleware");
const userRouter = express.Router();

userRouter.get("/", verifyUserAuthentication, getUsers);
userRouter.get("/all", optionalAuthentication, getAllUser);

module.exports = userRouter;
