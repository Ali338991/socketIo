var express = require("express")
var router = express.Router();
let {uploadImage} = require('../../../../config/Multer')

let {launchCourse,getCoursesList,deleteCourses,doCoursePublish,doCourseUnPublish,addWeek,courseSetup} = require('./CoursesController')

router.post('/launchCourse', (req,res)=>{   
    launchCourse(req,res)
})

router.get('/getCoursesList', (req,res)=>{   
    getCoursesList(req,res)
})
router.put('/doCoursePublish', (req,res)=>{   
    doCoursePublish(req,res)
})

router.put('/doCourseUnPublish', (req,res)=>{   
    doCourseUnPublish(req,res)
})

router.delete('/deleteCourses',(req,res)=>{   
    deleteCourses(req,res)
})
router.put('/courseSetup',uploadImage, (req,res)=>{   
    courseSetup(req,res)
})

// router.put('/addWeek', (req,res)=>{   
//     addWeek(req,res)
// })







module.exports = router;