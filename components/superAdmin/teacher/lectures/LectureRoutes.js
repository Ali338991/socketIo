var express = require("express")
var router = express.Router();

let {uploadLecture,getDataOfCourse,createNewWeek} = require('./LectureController')

router.put('/uploadLecture', (req,res)=>{   
    uploadLecture(req,res)
})
router.put('/createNewWeek', (req,res)=>{   
    createNewWeek(req,res)
})

router.get('/getDataOfCourse', (req,res)=>{   
    getDataOfCourse(req,res)
})










module.exports = router;