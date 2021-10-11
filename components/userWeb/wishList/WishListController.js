var wishLists = require("./WishListModel")
var CoursesList = require("../../superAdmin/teacher/courses/CoursesModel");
//Function to add enrollCorse
module.exports.addTowishList = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "Id required", statusCode: 400 })
    return
  } else if (!req.body?.CouerseId) {
    res.status(400).json({ status: "error", message: "CouerseId Required", statusCode: 400 })
    return
  }  else {
    const checkCourse = await CoursesList.findById(req.body.CouerseId)
   if (!checkCourse) {
    res.status(400).json({ status: "error", message: "Course Not Exist Plz Choose Existing Course", statusCode: 400 })
    return     
   } 
   const { id, CouerseId } = req.body;
   const wishListsList = await wishLists.findOne({ userId: req.body?.id })
   const alreadyAddOrNot = wishListsList?.myWishLists?.find((item)=>{
    return item == CouerseId
  })
  if (alreadyAddOrNot) {
   res.status(400).json({ status: "error", message: "This course already in wishlists", statusCode: 400 })
   return     
  } 
console.log(req.body);
const newWishLists = await wishLists.findOneAndUpdate({userId:id}, {
  $push: { myWishLists: CouerseId} 
}, { new: true,upsert:true }
)
  newWishLists.save((err,success) => {
    if (err) {
      res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
      return
    }   
    res.status(201).json({ status: "success",data:success,message:'Add to wishList' ,statusCode: 201 })
    return
  });    
  }
};
module.exports.getWishlists = async (req, res) => {
  try {
    const wishListsList = await wishLists.find({ userId: req.body?.userId }).populate('myWishLists')
    res.status(202).json({ status: "success", message: "Get list of Courses Successfully", data: wishListsList, statusCode: 202 })
    return
  } catch (error) {
    res.status(400).json({ status: "success", message: err?.message, statusCode: 400 })
    return
  }
};
//Delete
module.exports.deleteWishlistItem = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "Id required", statusCode: 400 })
    return
  } else if (!req.body?.CouerseId) {
    res.status(400).json({ status: "error", message: "CouerseId Required", statusCode: 400 })
    return
  }  else {
   const { id, CouerseId } = req.body;
   const newWishLists = await wishLists.findOneAndUpdate(
     {userId:id,$pull: { myWishLists: CouerseId}}
    
  )
  newWishLists.save((err,success) => {
    if (err) {
      res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
      return
    }   
    res.status(201).json({ status: "success",data:success,message:'Delete Item from  wishList' ,statusCode: 201 })
    return
  }); 
   
  }


};