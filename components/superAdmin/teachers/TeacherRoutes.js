var express = require("express")
var router = express.Router();
let {uploadImage}=require('../../../config/Multer');
let {addTeacher,getTeachers,temporaryBlock,permanentBlock,fullControl,deleteTeacher,updateTeacher} = require('./TeacherController');

router.post('/addTeacher',uploadImage, (req,res)=>{   
    addTeacher(req,res)
})

router.get('/getTeachers', (req,res)=>{   
    getTeachers(req,res)
})

router.put('/temporaryBlock', (req,res)=>{   
    temporaryBlock(req,res)
})

router.put('/permanentBlock', (req,res)=>{   
    permanentBlock(req,res)
})
router.put('/fullControl', (req,res)=>{   
    fullControl(req,res)
})
router.delete('/deleteTeacher', (req,res)=>{   
    deleteTeacher(req,res)
})
router.put('/updateTeacher',uploadImage,(req,res)=>{   
    updateTeacher(req,res)
})
module.exports = router;