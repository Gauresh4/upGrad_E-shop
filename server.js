const mongoose = require("mongoose");
const app = require("../E-SHOP/app");
const serverConfigs = require("../E-SHOP/configs/server.configs");
const dbConfigs = require("../E-SHOP/configs/db.configs");

mongoose.connect(dbConfigs.DB_URL);

const db = mongoose.connection;

db.on("error", () => {
  console.log("Error while connecting to DataBase");
});

db.once("open", () => {
  console.log("Connected to DataBase");
});

app.listen(serverConfigs.PORT, () => {
  console.log(`Server is started on port ${serverConfigs.PORT}`);
});
//abcd
