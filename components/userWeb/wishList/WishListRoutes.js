var express = require("express")
var router = express.Router();

let verifyToken= require('../../../middleware/AuthMiddleware')


let {addTowishList,getWishlists,deleteWishlistItem} = require('./WishListController')

router.post('/addTowishList',verifyToken, (req,res)=>{   
    addTowishList(req,res)
})
router.get('/getWishlists', (req,res)=>{   
    getWishlists(req,res)
})
router.delete('/deleteWishlistItem', (req,res)=>{   
    deleteWishlistItem(req,res)
})







module.exports = router;