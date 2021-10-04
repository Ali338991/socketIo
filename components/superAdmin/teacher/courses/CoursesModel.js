var mongoose = require("mongoose")
var CoursesSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.String,
  instructorName: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  video: { type: String, "default": ""},
  teacherEmail: {
    type: String,  
    required: [true, "Email required"]
  },
  teacherId:{
    type: String,
  },
  image: {
    type: String,
  },
})




var CoursesList = mongoose.model("Courses", CoursesSchema)
module.exports = CoursesList