require("dotenv").config();
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser")
var dbConnection = require("./config/Db");
// Routes List

 var AdminRoutes = require("./components/superAdmin/admins/AdminRoutes");


var app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'))

dbConnection();

app.get("/", function (req, res) {
  // logics main server
  res.send("Server is working");
});

app.use("/superAdmin/admins", AdminRoutes);



// server port listener
app.listen("5000", (err) => {
  if (err) {
    console.log("something went wrong", error);
  } else {
    console.log("server is working on port, 5000");
  }
});
