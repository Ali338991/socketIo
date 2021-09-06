var mongoose = require("mongoose")
var AdminSchema = mongoose.Schema({
 
  Name:{
    type: String,
      required:true
  }, 
  UserName:{
    type: String,
      required:true
  }, 
  Email:{
    type: String,
      required:true
  }, 
  Image:{
    type: String,
      required:true
  },
  Mobile:{
    type: Number,
      required:true
  },
  Status:{
    type: String,
      required:true
  }, 
  Role:{
    type: String,
      required:true
  },
 
})




var AdminList = mongoose.model("Admins", AdminSchema)
module.exports = AdminList