var express = require('express')
var router = express.Router()

let {uploadImage} = require('../../../config/Multer');
const { SignUp, SignIn } = require('./AuthController');


router.post('/signUp', uploadImage,  (req,res) => {
  SignUp(req,res);
});
router.post('/signIn',   (req,res) => {
  SignIn(req,res);
});

module.exports = router;