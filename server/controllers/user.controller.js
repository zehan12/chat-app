const User = require("../models/user.schema");

const getUsers = async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : [];
  const users = await User.find(keyword).find({ id: { $ne: req.user._id } });
  return res.status(200).json(users);
};

const getAllUser = async (req, res, next) => {
  const users = await User.find();
  return res.status(200).json({ users });
};

module.exports = {
  getUsers,
  getAllUser,
};
