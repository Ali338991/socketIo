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
  email: {
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
    },
  image:{
    type: String,
  },
  password:{
    type: String,
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
  cloudinaryId:{
    type: String,
  }
 
 
})




var StudentList = mongoose.model("students", StudentSchema)
module.exports = StudentList