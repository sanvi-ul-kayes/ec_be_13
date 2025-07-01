require("dotenv").config();
const express = require("express");
const router = require("./router");
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("uploads"));
dbConnect();

app.use(router);

//localhost:7878/
app.listen(process.env.HOST_URL, () => {
  console.log("Server is running");
});
