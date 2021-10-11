var mongoose = require("mongoose")
var wishListsSchema = mongoose.Schema({

  
 
  userId:{
    type: String,
    required: true
  },
  myWishLists: {
    type: mongoose.Schema.Types.Array,
    items: {
      type: String,
    },
    ref: 'Courses'
  },

})




var wishLists = mongoose.model("wishLists", wishListsSchema)
module.exports = wishLists