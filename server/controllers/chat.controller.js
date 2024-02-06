const Chat = require("../models/chat.schema");
const User = require("../models/user.schema");

const createOrRetrieveChat = async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  const currentUser = req.user;

  var existingChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: currentUser.id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  existingChat = await User.populate(existingChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (existingChat.length > 0) {
    return res.status(200).json(existingChat[0]);
  } else {
    try {
      const chatCreated = await Chat.create({
        chatName: "sender",
        isGroupChat: false,
        users: [req.user.id, userId],
      });
      const fullChatConversation = await Chat.findOne({
        _id: chatCreated._id,
      }).populate("users", "-password");
      return res.status(200).json(fullChatConversation);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
};

module.exports = { createOrRetrieveChat };
