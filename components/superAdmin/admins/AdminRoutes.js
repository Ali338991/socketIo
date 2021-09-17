var express = require("express")
var router = express.Router();

let {addAdmin,getAdminList,temporaryBlok,permanentBlok,fullControl,updateAdmin,login,deleteAdmin} = require('./AdminController')
let {uploadImage} = require('../../../config/Multer')


router.post('/login', (req,res)=>{   
    login(req,res)
})

router.post('/addAdmin',uploadImage, (req,res)=>{   
    addAdmin(req,res)
})
router.get('/getAdminList', (req,res)=>{   
    getAdminList(req,res)
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

router.put('/updateAdmin',uploadImage, (req,res)=>{   
    updateAdmin(req,res)
})

router.delete('/deleteAdmin',(req,res)=>{   
    deleteAdmin(req,res)
})








module.exports = router;