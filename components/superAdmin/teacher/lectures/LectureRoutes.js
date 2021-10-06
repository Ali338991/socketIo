var express = require("express")
var router = express.Router();

let {uploadLecture,getDataOfCourse} = require('./LectureController')

router.put('/uploadLecture', (req,res)=>{   
    uploadLecture(req,res)
})

router.get('/getDataOfCourse', (req,res)=>{   
    getDataOfCourse(req,res)
})










module.exports = router;