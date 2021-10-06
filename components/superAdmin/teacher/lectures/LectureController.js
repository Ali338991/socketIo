var lectureCollection = require("./LectureModel");
// let { launchCourse } = require('../../../../utils/sendEmail');
// var AdminList = require("../../admins/AdminModel");
// const cloudinary = require('../../../../config/Cloudinary');

//New Week
module.exports.createNewWeek = async (req, res) => {
  if (!req.body?.courseId) {
    res.status(400).json({ status: "error", message: "courseId required", statusCode: 400 })
    return
  } else if (!req.body?.week) {
    res.status(400).json({ status: "error", message: "Week Number Required", statusCode: 400 })
    return
  } else {
    const { week, courseId } = req.body;
    const checkExistingWeek = await lectureCollection.findOne({ courseId: courseId, "lecture.week": week })
    if (checkExistingWeek) {
      res.status(400).json({ status: "error", message: `Week ${week} Already Exist`, statusCode: 400 })
      return
    } else {
      const weekCreated = await lectureCollection.findOneAndUpdate(
        { courseId: req.body?.courseId },
        { $push: { lecture: { week: week, lectureList: [] } } },
        { new: true }
      )
      
      res.status(201).json({ status: "success", data: weekCreated, message: `Week ${week} Create Successfully`, statusCode: 201 })
    }
  }
};
// Add Lecture
module.exports.uploadLecture = async (req, res) => {
  if (!req.body?.courseId) {
    res.status(400).json({ status: "error", message: "courseId required", statusCode: 400 })
    return
  } else if (!req.body?.week) {
    res.status(400).json({ status: "error", message: "week Number Required", statusCode: 400 })
    return
  } else if (!req.body?.lectureIndex) {
    res.status(400).json({ status: "error", message: "lectureIndex Required", statusCode: 400 })
    return
  }else if (!req.body?.lectureTitle) {
    res.status(400).json({ status: "error", message: "lectureTitle Required", statusCode: 400 })
    return
  }else if (!req.body?.lectureDescription) {
    res.status(400).json({ status: "error", message: "lectureDescription Required", statusCode: 400 })
    return
  } else if (!req.body?.lectureLink) {
    res.status(400).json({ status: "error", message: "lectureLink Required", statusCode: 400 })
    return
  } else {
    const { week, courseId, lectureIndex,lectureTitle,lectureDescription,lectureLink} = req.body;
    //Check week exist or not
    const checkExistingWeek = await lectureCollection.findOne({ courseId: courseId, "lecture.week": week })
    if (checkExistingWeek) {   
    const lectureData = await lectureCollection.findOneAndUpdate(
      { courseId:courseId, "lecture.week": week },
      {
        $push: {
          'lecture.$.lectureList': {
            $each: [{ 
              lectureIndex:lectureIndex,
              lectureTitle:lectureTitle,
              lectureDescription:lectureDescription,
               lectureLink:lectureLink }],
            $position: 1
          }
        }
      },
      { new: true }
    ).populate('courseId')
    res.status(201).json({ status: "success", data: lectureData, message: `Lecture Added Successfully`, statusCode: 201 })
    }else{
      res.status(400).json({ status: "error", message: `Week Not Exist! Plz Add week`, statusCode: 400 })
      return
    }
  }
};

module.exports.getDataOfCourse = async (req, res) => {
  try {
    const getCoursesList = await lectureCollection.findOne({ courseId: req.body?.courseId }).populate('courseId')
    res.status(202).json({ status: "success", message: "Get list of Courses Successfully", data: getCoursesList, statusCode: 202 })
    return
  } catch (error) {
    res.status(400).json({ status: "success", message: err?.message, statusCode: 400 })
    return
  }
};