const mongoose = require("mongoose");
const colors = require("colors");

const username = "Bizer44";
const password = "sexyboltenabhai";
const cluster = "cluster0.rzwrw";
const dbname = "Backend_template";

// mongodb+srv://Bizer44:<password>@cluster0.rzwrw.mongodb.net/?retryWrites=true&w=majority

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