var express = require("express")
var router = express.Router();

let {login} = require('./AdminController')


router.post('/login', (req,res)=>{   
    login(req,res)
})






module.exports = router;