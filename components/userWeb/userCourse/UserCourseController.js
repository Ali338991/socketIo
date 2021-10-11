var StudentList = require("../../superAdmin/students/StudentModel")
var CoursesList = require("../../superAdmin/teacher/courses/CoursesModel");
//Function to add enrollCorse
module.exports.enrollCorse = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "User Id required", statusCode: 400 })
    return
  } else if (!req.body?.enrollCouerseId) {
    res.status(400).json({ status: "error", message: "Course Id Required", statusCode: 400 })
    return
  }  else {
    const checkCourse = await CoursesList.findById(req.body.enrollCouerseId)
   if (!checkCourse) {
    res.status(400).json({ status: "error", message: "Course Not Exist Plz Choose Existing Course", statusCode: 400 })
    return     
   } 
   const findStudent = await StudentList.findOne({_id:req.body.id})
   const alreadyEnrollOrNot = findStudent.enrolledCourse?.find((item)=>{
     return item == req.body.enrollCouerseId
   })
   if (alreadyEnrollOrNot) {
    res.status(400).json({ status: "error", message: "You Already enrolled in this Course", statusCode: 400 })
    return     
   }  
    const userEnrolledCourse = await StudentList.findByIdAndUpdate(req.body.id, {
      $push: { enrolledCourse:checkCourse._id } 
   }, { new: true }
   )
 console.log("userEnrolledCourse",userEnrolledCourse);
   userEnrolledCourse.save((err,success) => {
    if (err) {
      res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
      return
    }   
    res.status(201).json({ status: "success",message:`Congratulation You are Enrolled in ${checkCourse.courseName} Course` ,statusCode: 201 })
    return
  });    
  }
};
