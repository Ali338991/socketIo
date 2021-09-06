var express = require("express")
var router = express.Router();

let {addAdmin,uploadImage,getAdminList} = require('./AdminController')

router.post('/addAdmin',uploadImage, (req,res)=>{   
    addAdmin(req,res)
})

router.get('/getAdminList', (req,res)=>{   
    getAdminList(req,res)
})

// router.get('/getCourseList', (req,res)=>{   
//     GetListOfCourse(req,res)
// })

// router.post('/deleteCourse', (req,res)=>{ 

//     DeleteCourse(req,res)
// })







module.exports = router;