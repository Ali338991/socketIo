var express = require("express")
var router = express.Router();

let {enrollCorse} = require('.//UserCourseController')

router.put('/enrollCorse', (req,res)=>{   
    enrollCorse(req,res)
})






module.exports = router;