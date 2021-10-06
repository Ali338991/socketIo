var lectureCollection = require("./LectureModel");
let { launchCourse } = require('../../../../utils/sendEmail');
var AdminList = require("../../admins/AdminModel");
const cloudinary  = require('../../../../config/Cloudinary');

//Add Courses
module.exports.uploadLecture = async (req, res) => {
  console.log("run");
  if (!req.body?.courseId) {
    res.status(400).json({ status: "error", message: "courseId required", statusCode: 400 })
    return
  } else if (!req.body?.week) {
    res.status(400).json({ status: "error", message: "week Number Required", statusCode: 400 })
    return
  } else if (!req.body?.lectureIndex) {
    res.status(400).json({ status: "error", message: "lectureIndex Required", statusCode: 400 })
    return
  }else if (!req.body?.lectureLink) {
    res.status(400).json({ status: "error", message: "lectureLink Required", statusCode: 400 })
    return
  } else {
    console.log("run2");
    const  lectureData =await lectureCollection.findOneAndUpdate(
      {courseId: req.body?.courseId,"lecture.week":req.body.week},
      {$push: {'lecture.0.lectureList': {lectureIndex:req.body.lectureIndex,lectureLink:req.body.lectureLink}}},
       { new: true }
   )
   if (!lectureData) {    
     console.log("checkdata 1"); 
    const  checkData =await lectureCollection.findOneAndUpdate(
      {courseId: req.body?.courseId},
      {$push: {lecture: {week:req.body.week,lectureList:[{lectureIndex:req.body.lectureIndex,lectureLink:req.body.lectureLink}]}}},
       { new: true }
   )
   console.log("checkdata 2"); 
   }
   console.log("lectureData",lectureData);
   console.log("run 3");



   

  }
};

module.exports.getDataOfCourse = async (req, res) => {
  try {
    const getCoursesList = await lectureCollection.findOne({courseId:req.body?.courseId}).populate('courseId',"courseName")

    res.status(202).json({ status: "success", message: "Get list of Courses Successfully", data: getCoursesList, statusCode: 202 })
    return
  } catch (error) {
    res.status(400).json({ status: "success", message: err?.message, statusCode: 400 })
    return
  }
};