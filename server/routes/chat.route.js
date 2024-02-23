const express = require("express");
const { verifyUserAuthentication } = require("../middlewares/auth.middleware");
const chatController = require("../controllers/chat.controller");

const chatRouter = express.Router();

chatRouter.post(
  "/",
  verifyUserAuthentication,
  chatController.createOrRetrieveChat
);

chatRouter.get("/", verifyUserAuthentication, chatController.fetchUsersChat);

chatRouter.post(
  "/group",
  verifyUserAuthentication,
  chatController.spawnGroupChannel
);

chatRouter.put(
  "/rename",
  verifyUserAuthentication,
  chatController.amendGroupName
);

chatRouter.put(
  "/add-to-group",
  verifyUserAuthentication,
  chatController.addMemberToGroup
);

chatRouter.delete(
  "/remove-from-group",
  verifyUserAuthentication,
  chatController.ejectGroupMember
);

module.exports = chatRouter;
