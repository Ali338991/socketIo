var StudentList = require("../students/StudentModel");
var teacherObject = require("../admins/AdminModel");
var CoursesList = require("../teacher/courses/CoursesModel");
var successStories = require("../../userWeb/successStories/SuccessStoriesModel");
var AdminList = require("../admins/AdminModel");

// get total students
module.exports.getTotalStudents = async (req, res) => {
  try {
    const getTotalStudents = await StudentList.countDocuments();

    res
      .status(202)
      .json({
        status: "success",
        message: "Get Total Students Successfully",
        data: getTotalStudents,
        statusCode: 202,
      });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ status: "success", message: { error }, statusCode: 400 });
    return;
  }
};

// get total teachers
module.exports.getTotalTeachers = async (req, res) => {
  try {
    const getTotalTeachers = await teacherObject.find({ role: "teacher" });

    res
      .status(202)
      .json({
        status: "success",
        message: "Get Total Teachers Successfully",
        data: getTotalTeachers.length,
        statusCode: 202,
      });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ status: "success", message: { error }, statusCode: 400 });
    return;
  }
};

// get total courses
module.exports.getTotalCourses = async (req, res) => {
  try {
    const getTotalCourses = await CoursesList.countDocuments();

    res
      .status(202)
      .json({
        status: "success",
        message: "Get Total Courses Successfully",
        data: getTotalCourses,
        statusCode: 202,
      });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ status: "success", message: { error }, statusCode: 400 });
    return;
  }
};

// get total pending success stories
module.exports.getPendingStories = async (req, res) => {
  try {
    const getPendingStories = await successStories.find({ status: "reject" });

    res
      .status(202)
      .json({
        status: "success",
        message: "Get Pending Success Stories Successfully",
        data: getPendingStories.length,
        statusCode: 202,
      });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ status: "success", message: { error }, statusCode: 400 });
    return;
  }
};

// get total approve success stories
module.exports.getSuccessStories = async (req, res) => {
  try {
    const getSuccessStories = await successStories.find({ status: "Approve" });

    res
      .status(202)
      .json({
        status: "success",
        message: "Get Success Success Stories Successfully",
        data: getSuccessStories.length,
        statusCode: 202,
      });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ status: "success", message: { error }, statusCode: 400 });
    return;
  }
};

// get total admins
module.exports.getTotalAdmins = async (req, res) => {
  try {
    const getTotalAdmins = await AdminList.find({ role: "admin" });

    res
      .status(202)
      .json({
        status: "success",
        message: "Get Total Admins Successfully",
        data: getTotalAdmins.length,
        statusCode: 202,
      });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ status: "success", message: { error }, statusCode: 400 });
    return;
  }
};
