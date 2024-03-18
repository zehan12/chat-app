const { express } = require("express");

const { auth } = require("../middlewares/auth.middleware");

const messageRouter = express.Router();

messageRouter.post("/", auth, sendMessage);

messageRouter.get("/:chatId", auth, getMessage);

module.exports = messageRouter;