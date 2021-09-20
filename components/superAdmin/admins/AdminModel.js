var mongoose = require("mongoose")
var AdminSchema = mongoose.Schema({
 
  name:{
    type: String,
      required:true
  }, 
  userName:{
    type: String,
      required:true
  }, 
   password:{
    type: String,
  },  
  image:{
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
  role:{
    type: String,
      required:true
  },
  cloudinaryId:{
    type: String,
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
    }
 
})




var AdminList = mongoose.model("admins", AdminSchema)
module.exports = AdminList