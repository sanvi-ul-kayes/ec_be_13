const { default: mongoose } = require("mongoose");

function dbConnect() {
  console.log("Connecting...");
  mongoose
    .connect(process.env.DB_CONNECT)
    .then((result) => {
      console.log("Database is Connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = dbConnect;
