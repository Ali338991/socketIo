var express = require("express")
var router = express.Router();

let {addSuccessStories,getSuccessStories,approve,reject} = require('./SuccessStoriesController')
let {uploadImage} = require('../../../config/Multer')

router.post('/addSuccessStories',uploadImage, (req,res)=>{   
    addSuccessStories(req,res)
})

router.get('/getSuccessStories', (req,res)=>{   
    getSuccessStories(req,res)
})

router.put('/approve', (req,res)=>{   
    approve(req,res)
})

router.put('/reject', (req,res)=>{   
    reject(req,res)
})







module.exports = router;