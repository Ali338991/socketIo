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
  email:{
    type: String,
      required:true
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
 
})




var AdminList = mongoose.model("admins", AdminSchema)
module.exports = AdminList