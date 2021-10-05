var express = require('express')
var router = express.Router()

let {uploadImage} = require('../../../config/Multer');
const { SignUp, SignIn, ForgotPassword, VerifySignupUser } = require('./AuthController');


router.post('/signUp', uploadImage,  (req,res) => {
  SignUp(req,res);
});
router.post('/signIn',   (req,res) => {
  SignIn(req,res);
});
router.post('/forotPassword',   (req,res) => {
ForgotPassword(req,res);
});
router.post('/verifySignUpUser',   (req,res) => {
VerifySignupUser(req,res);
});

module.exports = router;