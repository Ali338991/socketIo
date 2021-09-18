var mongoose = require("mongoose")
var SuccessStoriesSchema = mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  successStoryImage: {
    type: String,  
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,    
  },
  whyReject: {
    type: String,    
  },
  cloudinaryId:{
    type: String,
  }

})




var successStories = mongoose.model("successStories", SuccessStoriesSchema)
module.exports = successStories