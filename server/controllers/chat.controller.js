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
        users: [currentUser.id, userId],
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

const fetchUsersChat = async (req, res, next) => {
  const user = req.user;
  const chats = await Chat.find({ users: { $elemMatch: { $eq: user.id } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });
  const usersChat = await User.populate(chats, {
    path: "latestMessage.sender",
    select: "name avatar email",
  });
  return res.status(200).json(usersChat);
};

const spawnGroupChannel = async (req, res, next) => {
  const currentUser = req.user;
  if (!req.body.users || !req.body.name) {
    return res.status(200).json({ message: "Fill all the fields" });
  }
  let users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res
      .status(400)
      .json({ message: "More than 2 users are required to form a group chat" });
  }

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users,
      isGroupChat: true,
      groupAdmin: currentUser.id,
    });
    const fetchFullGroupConversation = await Chat.findOne({
      _id: groupChat._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .lean();
    return res.status(200).json(fetchFullGroupConversation);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const amendGroupName = async (req, res, next) => {
  const { chatName, chatId } = req.body;
  const updateGroupName = Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updateGroupName) {
    return res.status(401).json({ message: "chat not found" });
  } else {
    return res
      .status(200)
      .json({ message: "group name changed", updateGroupName });
  }
};

module.exports = {
  createOrRetrieveChat,
  fetchUsersChat,
  spawnGroupChannel,
  amendGroupName,
};
