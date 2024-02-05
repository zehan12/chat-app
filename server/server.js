const app = require("./app");
const config = require("./config/config");
const connectDatabase = require("./config/database");

const port = config.port || 3000;

connectDatabase();

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
