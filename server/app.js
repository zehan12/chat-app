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

app.use("/api/auth",require("./routes/auth.route"));
app.use("/api/user",require("./routes/user.route"));
app.use("/api/chat",require("./routes/chat.route"));

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

// app.get("/api/chat", (req, res) => {
//   res.status(200).json({ chats });
// });

// app.get("/api/chat/:chatId", (req, res) => {
//   const { chatId } = req.params;
//   const chat = chats.map((chat) => chat._id === chatId);
//   res.status(200).json({ chat });
// });

app.get("/", (_, res) => {
  res.send("Hello from Backend")
})

// handle unknown routes
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.send("<body><h1>PAGE NOT FOUND</h1></body>");
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 NOT FOUND");
  }
});

module.exports = app;
