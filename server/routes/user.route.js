const express = require("express");
const { getUsers, getAllUser } = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/all", getAllUser);

module.exports = userRouter;
