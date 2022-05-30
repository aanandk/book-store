const mongoose = require("mongoose");
const config = require("config");
const dbUrl = config.get("mongoURI");

module.exports = function () {
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));
};
