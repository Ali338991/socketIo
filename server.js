require("dotenv").config();
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser")
var dbConnection = require("./config/Db");
const port = process.env.PORT || 5000;
// Routes List

//SuperAdmin --superAdmin
 var AdminRoutes = require("./components/superAdmin/admins/AdminRoutes");
 var teacherRoutes=require('./components/superAdmin/teachers/TeacherRoutes');
 var StudentRoutes = require("./components/superAdmin/students/StudentRoutes");
var AdminLoginRoutes= require("./components/superAdmin/admins/AdminLoginRoute")
//Teacher-api-route
var CoursesRoutes= require("./components/superAdmin/teacher/courses/CoursesRoutes")
//userWeb --student
var SuccessStoriesRoutes = require("./components/userWeb/successStories/SuccessStoriesRoutes");

// Dashboard --routes
var CountLengthRoutes = require("./components/superAdmin/dashboard/DashboardRoutes")





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
//SuperAdmin --superAdmin
app.use("/superAdmin/admins", AdminRoutes);
app.use("/superAdmin/teachers", teacherRoutes);
app.use("/superAdmin/students", StudentRoutes);
app.use("/admins", AdminLoginRoutes);
//Teacher-api-route
app.use("/superAdmin/teacher/courses", CoursesRoutes);


app.use("/superAdmin/dashboard", CountLengthRoutes);




//userWeb --student
app.use("/userWeb/SuccessStories", SuccessStoriesRoutes);




// server port listener
app.listen(port, (err) => {
  if (err) {
    console.log("something went wrong", error);
  } else {
    console.log(`server is working on port, ${port}`);
  }
});
