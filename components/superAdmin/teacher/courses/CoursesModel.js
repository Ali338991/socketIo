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
  teacherEmail: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
    validator: function(v) {
    return /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(v);
    },
    message: "Please enter a valid email"
    },
    required: [true, "Email required"]
    }
})




var CoursesList = mongoose.model("Courses", CoursesSchema)
module.exports = CoursesList