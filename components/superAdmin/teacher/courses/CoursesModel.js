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
  cover: {
    type: String,
  },
  intro: {
    type: String,
  },
  courseBrief:{
    type: String,

  },
  coverCloudinaryId: {
    type: String,
  },

  courseData: {
    type: mongoose.Schema.Types.String,
    ref: 'lectures'
  },
})




var CoursesList = mongoose.model("Courses", CoursesSchema)
module.exports = CoursesList