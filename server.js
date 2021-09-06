require("dotenv").config();
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser")
var dbConnection = require("./config/Db");
// Routes List
// var ordersRoute = require("./components/orders/OrdersRoutes");
// var AuthRoutes = require("./components/auth/AuthRoutes");
 var AdminRoutes = require("./components/superAdmin/admins/AdminRoutes");
 var teacherRoutes=require('./components/superAdmin/teachers/TeacherRoutes');


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
  res.send("Server is working");
});

app.use("/Admin", AdminRoutes);
app.use("/teachers", teacherRoutes);

// app.use("/auth", AuthRoutes);
// app.use("/orders", ordersRoute);

// ip:port/auth/login - post
// ip:port/orders/createOrder - post
// ip:port/orders - get

// server port listener
app.listen("5000", (err) => {
  if (err) {
    console.log("something went wrong", error);
  } else {
    console.log("server is working on port, 5000");
  }
});
