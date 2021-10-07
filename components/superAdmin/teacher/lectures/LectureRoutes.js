var express = require("express")
var router = express.Router();

let {uploadLecture,getDataOfCourse,createNewWeek,uploadassignment,uploadnotes} = require('./LectureController')
let {uploadFile} = require('../../../../config/Multer')

router.put('/createNewWeek', (req,res)=>{   
    createNewWeek(req,res)
})
router.put('/uploadLecture', (req,res)=>{   
    uploadLecture(req,res)
})
router.get('/getDataOfCourse', (req,res)=>{   
    getDataOfCourse(req,res)
})
router.put('/uploadassignment', uploadFile,(req,res)=>{   
    uploadassignment(req,res)
})
router.put('/uploadnotes', uploadFile,(req,res)=>{   
    uploadnotes(req,res)
})












module.exports = router;