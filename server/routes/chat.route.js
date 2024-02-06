const express = require("express");
const { verifyUserAuthentication } = require("../middlewares/auth.middleware");
const { createOrRetrieveChat } = require("../controllers/chat.controller");
const chatRouter = express.Router();

chatRouter.post("/", verifyUserAuthentication, createOrRetrieveChat);
// chatRouter.get("/",fetchChat);
// chatRouter.post("/group",createGroupChat);
// chatRouter.put("/rename",renameGroup);
// chatRouter.delete("/removeGroup",removeGroup);
// chatRouter.put("/addToGroup",addToGroup);

module.exports = chatRouter;
