var express = require("express")
var router = express.Router();

let {launchCourse,getCoursesList,deleteCourses,doCourseOnline,doCourseBlok} = require('./CoursesController')

router.post('/launchCourse', (req,res)=>{   
    launchCourse(req,res)
})

router.get('/getCoursesList', (req,res)=>{   
    getCoursesList(req,res)
})
router.put('/doCourseOnline', (req,res)=>{   
    doCourseOnline(req,res)
})

router.put('/doCourseBlok', (req,res)=>{   
    doCourseBlok(req,res)
})

router.delete('/deleteCourses',(req,res)=>{   
    deleteCourses(req,res)
})







module.exports = router;