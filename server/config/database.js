const mongoose = require("mongoose");
const config = require("../config/config");
const { logEvents } = require("../middlewares/logger");

const connectDatabase = async () => {
  const db = config.db.url.replace("<password>", config.db.password);
  const options = {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
  };
  try {
    await mongoose.connect(db, options);
    console.log("connected to database ✅");
  } catch (err) {
    logEvents(`code: ${err.code}  message: ${err.message}`, "mongoErrLog.log");
    console.log(`Error connecting to mongoose due to ${err.message} ❌`);
  }
};

module.exports = connectDatabase;
