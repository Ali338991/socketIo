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
var TotalStudentsRoutes = require("./components/superAdmin/dashboard/DashboardRoutes")
var TotalTeachersRoutes = require("./components/superAdmin/dashboard/DashboardRoutes")
var TotalCoursesRoutes = require("./components/superAdmin/dashboard/DashboardRoutes")
var PendingStoriesRoutes = require("./components/superAdmin/dashboard/DashboardRoutes")
var TSuccessStoriesRoutes = require("./components/superAdmin/dashboard/DashboardRoutes")
var TotalAdminsRoutes = require("./components/superAdmin/dashboard/DashboardRoutes")




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

// Dashboard --router
app.use("/superAdmin/dashboard", TotalStudentsRoutes);
app.use("/superAdmin/dashboard", TotalTeachersRoutes);
app.use("/superAdmin/dashboard", TotalCoursesRoutes);
app.use("/superAdmin/dashboard", PendingStoriesRoutes);
app.use("/superAdmin/dashboard", TSuccessStoriesRoutes);
app.use("/superAdmin/dashboard", TotalAdminsRoutes);




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
