var express = require("express")
var router = express.Router();

let {addAdmin,getAdminList,temporaryBlok,permanentBlok,fullControl,updateAdmin,deleteAdmin} = require('./AdminController')
let {uploadImage} = require('../../../config/Multer')

router.post('/addAdmin',uploadImage, (req,res)=>{   
    addAdmin(req,res)
})

router.get('/getAdminList', (req,res)=>{   
    getAdminList(req,res)
})

router.post('/temporaryBlok', (req,res)=>{   
    temporaryBlok(req,res)
})

router.post('/permanentBlok', (req,res)=>{   
    permanentBlok(req,res)
})

router.post('/fullControl', (req,res)=>{   
    fullControl(req,res)
})

router.post('/updateAdmin',uploadImage, (req,res)=>{   
    updateAdmin(req,res)
})

router.post('/deleteAdmin',uploadImage, (req,res)=>{   
    deleteAdmin(req,res)
})







module.exports = router;