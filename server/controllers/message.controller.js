const Message = require("../models/message.schema");
const Chat = require("../models/chat.schema");

const sendMessage = async (req, res) => {
  const { chatId, content } = req.body;
  if (!content || !chatId) {
    console.log("invalid data pass");
    return res.status(400).json({ message: "invalid data pass" });
  }
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "avatar").execPopulate();
    message = await message.populate("chat").execPopulate();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name avatar email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.status(200).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  sendMessage,
};
