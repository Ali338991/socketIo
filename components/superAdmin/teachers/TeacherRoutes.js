var express = require("express")
var router = express.Router();
let {uploadImage}=require('../../../config/Multer');
let {addTeacher,getTeachers,temporaryBlock,permanentBlock} = require('./TeacherController');

router.post('/addTeacher',uploadImage, (req,res)=>{   
    addTeacher(req,res)
})

router.get('/getTeachers', (req,res)=>{   
    getTeachers(req,res)
})

router.post('/temporaryBlock', (req,res)=>{   
    temporaryBlock(req,res)
})

router.post('/permanentBlock', (req,res)=>{   
    permanentBlock(req,res)
})
module.exports = router;