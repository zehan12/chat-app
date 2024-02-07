const express = require("express");
const { verifyUserAuthentication } = require("../middlewares/auth.middleware");
const {
  createOrRetrieveChat,
  fetchUsersChat,
  spawnGroupChannel,
  amendGroupName
} = require("../controllers/chat.controller");
const chatRouter = express.Router();

chatRouter.post("/", verifyUserAuthentication, createOrRetrieveChat);
chatRouter.get("/", verifyUserAuthentication, fetchUsersChat);
chatRouter.post("/group", verifyUserAuthentication, spawnGroupChannel);
chatRouter.put("/rename", amendGroupName);
// chatRouter.delete("/removeGroup",removeGroup);
// chatRouter.put("/addToGroup",addToGroup);

module.exports = chatRouter;
