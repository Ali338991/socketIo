var express = require("express")
var router = express.Router();

let {addStudent,getStudentList,temporaryBlok,permanentBlok,fullControl,updateStudent,deleteStudent} = require('./StudentController')
let {uploadImage} = require('../../../config/Multer')

router.post('/addStudent',uploadImage, (req,res)=>{   
    addStudent(req,res)
})

router.get('/getStudentList', (req,res)=>{   
    getStudentList(req,res)
})

router.put('/temporaryBlok', (req,res)=>{   
    temporaryBlok(req,res)
})

router.put('/permanentBlok', (req,res)=>{   
    permanentBlok(req,res)
})

router.put('/fullControl', (req,res)=>{   
    fullControl(req,res)
})

router.put('/updateStudent',uploadImage, (req,res)=>{   
    updateStudent(req,res)
})

router.delete('/deleteStudent',(req,res)=>{   
    deleteStudent(req,res)
})







module.exports = router;