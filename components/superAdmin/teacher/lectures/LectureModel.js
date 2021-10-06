var mongoose = require("mongoose")
var LectureSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.String,
  
  courseId: {
    type: mongoose.Schema.Types.String,
    ref: 'Courses',
    required: true
  },
  lecture:{  
    type: mongoose.Schema.Types.Array,
     items:{     
      type: Object,
      week :{type: String},
        lectureList: {
          type: mongoose.Schema.Types.Array,
          items:{ 
            type: Object,
            lectureIndex :{type: String} , 
            lectureTitle :{type: String} , 
            lectureDescription :{type: String} , 
            lectureLink :{type: String}  
           
          },
        },
    },  
  },
  lectureIndex:{
    type:String
  },
  lectureLink:{
    type:String
  },


  
})




var lectureCollection = mongoose.model("lectures", LectureSchema)
module.exports = lectureCollection