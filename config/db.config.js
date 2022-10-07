const mongoose = require("mongoose");
const colors = require("colors");

const username = "hbn_mongo";
const password = "HbnSaddweb123";
const cluster = "cluster0.jaud8";
const dbname = "Backend_template";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log(`Database Connected successfully`.bold.blue);
});

module.exports = db;