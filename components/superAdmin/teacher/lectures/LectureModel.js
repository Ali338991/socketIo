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
        assignmentList: {
          type: mongoose.Schema.Types.Array,
          items:{ 
            type: Object,
            assignmentIndex :{type: String} , 
            assignmentTitle :{type: String} , 
            assignmentDescription :{type: String} , 
            assignmentFile :{type: String}  ,
            assignmentCloudinaryId :{type: String}  

           
          },
        },
        notesList: {
          type: mongoose.Schema.Types.Array,
          items:{ 
            type: Object,
            notesIndex :{type: String} , 
            notesTitle :{type: String} , 
            notesDescription :{type: String} , 
            notesFile :{type: String} , 
            notesCloudinaryId :{type: String}             
          },
        },
        weeklyQuiz: {
          type: mongoose.Schema.Types.Array,
          items:{ 
            type: Object,
            question :{type: String} , 
            choices :[{type: String}] , 
            answer :{type: String}              
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