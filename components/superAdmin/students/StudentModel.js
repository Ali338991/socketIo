var mongoose = require("mongoose")
var StudentSchema = mongoose.Schema({
 
  name:{
    type: String,
      required:true
  }, 
  userName:{
    type: String,
      required:true
  }, 
  email:{
    type: String,
      required:true
  }, 
  image:{
    type: String,
      required:true
  },
  mobile:{
    type: Number,
      required:true
  },
  status:{
    type: String,
      required:true
  }, 
  course:{
    type: String,
      required:true
  }, 
  role:{
    type: String,
      required:true
  },
 
})




var StudentList = mongoose.model("students", StudentSchema)
module.exports = StudentList