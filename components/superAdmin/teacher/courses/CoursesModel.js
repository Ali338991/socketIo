var mongoose = require("mongoose")
var CoursesSchema = mongoose.Schema({ 
  instructorName:{
    type: String,
      required:true
  },  
  courseName:{
    type: String,
      required:true
  },  
  status:{
    type: String,
    required:true
  },  
  teacherEmail:{
    type: String,
      required:true
  },
})




var CoursesList = mongoose.model("Courses", CoursesSchema)
module.exports = CoursesList