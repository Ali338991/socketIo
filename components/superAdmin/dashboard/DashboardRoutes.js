var express = require("express")
var router = express.Router();

let {
  getTotalStudents,
  getTotalTeachers,
  getTotalCourses,
  getPendingStories,
  getSuccessStories,
  getTotalAdmins,
} = require("./DashboardController");

router.get('/getTotalStudents', (req, res) => {


    getTotalStudents(req, res);

});
router.get('/getTotalTeachers', (req, res) => {


    getTotalTeachers(req, res);

});
router.get('/getTotalCourses', (req, res) => {


    getTotalCourses(req, res);

});
router.get('/getPendingStories', (req, res) => {


    getPendingStories(req, res);

});
router.get('/getSuccessStories', (req, res) => {


    getSuccessStories(req, res);

});
router.get('/getTotalAdmins', (req, res) => {


    getTotalAdmins(req, res);

});




module.exports = router;