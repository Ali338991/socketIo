var express = require("express")
var router = express.Router();
let { uploadImage } = require('../../../config/Multer')
let { login, getData, signUp, getActiveUser, profileUpdate } = require('./AdminController')


router.post('/login', (req, res) => {
    login(req, res)
})

router.put('/getData', (req, res) => {
    getData(req, res)
})

router.post('/getActiveUser', (req, res) => {
    getActiveUser(req, res)
})

router.put('/signUp', (req, res) => {
    signUp(req, res)
})

router.put('/profileUpdate', uploadImage, (req, res) => {
    profileUpdate(req, res)
})

module.exports = router;