var StudentList  = require('../students/StudentModel')
var teacherObject = require('../admins/AdminModel')
var CoursesList = require('../teacher/courses/CoursesModel')
var successStories = require('../../userWeb/successStories/SuccessStoriesModel')
var AdminList = require('../admins/AdminModel')

// get total students
module.exports.getTotalStudents = async (req, res) => {
  try {
      
    const getTotalStudents = await StudentList.countDocuments()     
      
    res.status(202).json({ status: "success", message: "Get Total Students Successfully", data: getTotalStudents, statusCode: 202 })
    return
  } catch (error) {
    res.status(400).json({ status: "success", message: { error }, statusCode: 400 })
    return
  }
};
module.exports.getTotalTeachers = async (req, res) => {
  try {
      
    const getTotalTeachers = await teacherObject.find({role : "teacher"})     
    // let newGetTotalTeachers = [];
    // getTotalTeachers.map((item) => {
    //   if (item.role == "teacher") {
    //     newGetTotalTeachers.push(item);
    //   }
    // });
      
    res.status(202).json({ status: "success", message: "Get Total Teachers Successfully", data: getTotalTeachers.length, statusCode: 202 })
    return
  } catch (error) {
    res.status(400).json({ status: "success", message: { error }, statusCode: 400 })
    return
  }
};
module.exports.getTotalCourses = async (req, res) => {
  try {
      
    const getTotalCourses = await CoursesList.countDocuments();     
      
    res.status(202).json({ status: "success", message: "Get Total Courses Successfully", data: getTotalCourses, statusCode: 202 })
    return
  } catch (error) {
    res.status(400).json({ status: "success", message: { error }, statusCode: 400 })
    return
  }
};
module.exports.getPendingStories = async (req, res) => {
  try {
      
    const getPendingStories = await successStories.find({status :"reject"})  
    
    // let newPendingStories = []
    // getPendingStories.map((item)=>{
    //   if(item.status == 'reject'){
    //     newPendingStories.push(item)
    //   }
    // })

    
      
    res.status(202).json({ status: "success", message: "Get Pending Courses Successfully", data: getPendingStories.length, statusCode: 202 })
    return
  } catch (error) {
    res.status(400).json({ status: "success", message: { error }, statusCode: 400 })
    return
  }
};
module.exports.getSuccessStories = async (req, res) => {
  try {
      
    const getSuccessStories = await successStories.find({status : "Approve"})  
    
    // let newSuccessStories = []
    // getSuccessStories.map((item)=>{
    //   if(item.status == 'Approve'){
    //     newSuccessStories.push(item)
    //   }
    // })

    
      
    res.status(202).json({ status: "success", message: "Get Success Courses Successfully", data: getSuccessStories.length, statusCode: 202 })
    return
  } catch (error) {
    res.status(400).json({ status: "success", message: { error }, statusCode: 400 })
    return
  }
};
module.exports.getTotalAdmins = async (req, res) => {
  try {
      
    const getTotalAdmins = await AdminList.find({role: "admin"});  
    
    // let newGetTotalAdmins = [];
    // getTotalAdmins.map((item) => {
    //   if (item.role == "admin") {
    //     newGetTotalAdmins.push(item);
    //   }
    // });

    
      
    res.status(202).json({ status: "success", message: "Get Total Admins Successfully", data: getTotalAdmins.length, statusCode: 202 })
    return
  } catch (error) {
    res.status(400).json({ status: "success", message: { error }, statusCode: 400 })
    return
  }
};