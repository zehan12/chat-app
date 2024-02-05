const User = require("../models/user.schema");

const registerAndCreateUser = async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "fields required" });
  }
  const userExits = await User.findOne({ email });
  if (userExits) return res.status(400).json({ message: "user already exits" });
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    const token = await user.signToken();
    console.log(user, token);
    return res.status(201).json({
      message: "user created",
      user: user.userJSON(token),
    });
  } else {
    return res.status(400).json({ message: "error while creating user" });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "fields required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Email not registered" });
  }
  const result = await user.verifyPassword(String(password));
  if (!result) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = await user.signToken();
  res.status(201).json({ message: "user login", user: user.userJSON(token) });
};

module.exports = {
  registerAndCreateUser,
  loginUser
};
