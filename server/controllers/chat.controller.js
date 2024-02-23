const Chat = require("../models/chat.schema");
const User = require("../models/user.schema");

const createOrRetrieveChat = async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  const currentUser = req.user;

  let existingChat = await Chat.find({
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
  }
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
};

const fetchUsersChat = async (req, res, next) => {
  const user = req.user;
  const groupChat = await Chat.find({ groupAdmin: user.id }).populate(
    "users",
    "-password"
  );
  const chats = await Chat.find({ users: { $elemMatch: { $eq: user.id } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage");
  const allChats = chats
    .concat(groupChat)
    .flat()
    .sort((a, b) => b.updatedAt - a.updatedAt);
  const usersChat = await User.populate(allChats, {
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
  const users = JSON.parse(req.body.users);
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
  const updateGroupName = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updateGroupName) {
    return res.status(401).json({ message: "chat not found" });
  }
  return res
    .status(200)
    .json({ message: "group name changed", updateGroupName });
};

const addMemberToGroup = async (req, res, next) => {
  const { userId, chatId } = req.body;
  // const
  const addedUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  console.log(addedUser, "here");
  if (!addedUser) {
    return res.status(400).json({ message: "error while adding user" });
  }
  return res.status(201).json({ message: "user added to group", addedUser });
};

const ejectGroupMember = async (req, res, next) => {
  const { userId, chatId } = req.body;
  const removedUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!removedUser) {
    return res.status(400).json({ message: "error while removing user" });
  }
  return res
    .status(201)
    .json({ message: "user removed from group", removedUser });
};

const chatController = {
  createOrRetrieveChat,
  fetchUsersChat,
  spawnGroupChannel,
  amendGroupName,
  addMemberToGroup,
  ejectGroupMember,
};

module.exports = chatController;
