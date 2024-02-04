const express = require("express");
const cors = require("cors");
const chats = require("./data/dummyChat");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{
  console.log(req.method,req.url,req.body);
  next();
})

app.post("/api/auth/login", (req, res) => {
  console.log(req.body)
  res.send(req.body)
});

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.get("/api/chat", (req, res) => {
  res.status(200).json({ chats });
});

app.get("/api/chat/:chatId", (req, res) => {
  const { chatId } = req.params;
  const chat = chats.map((chat) => chat._id === chatId);
  res.status(200).json({ chat });
});

module.exports = app;
