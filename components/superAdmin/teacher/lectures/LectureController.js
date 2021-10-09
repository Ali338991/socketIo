var lectureCollection = require("./LectureModel");
// let { launchCourse } = require('../../../../utils/sendEmail');
// var AdminList = require("../../admins/AdminModel");
const cloudinary = require('../../../../config/Cloudinary');

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

//  uploadnotes
module.exports.uploadnotes = async (req, res) => {
  if (!req.body?.courseId) {
    res.status(400).json({ status: "error", message: "courseId required", statusCode: 400 })
    return
  } else if (!req.body?.week) {
    res.status(400).json({ status: "error", message: "week Number Required", statusCode: 400 })
    return
  } else if (!req.body?.notesIndex) {
    res.status(400).json({ status: "error", message: "notesIndex Required", statusCode: 400 })
    return
  }else if (!req.body?.notesTitle) {
    res.status(400).json({ status: "error", message: "notesTitle Required", statusCode: 400 })
    return
  }else if (!req.body?.notesDescription) {
    res.status(400).json({ status: "error", message: "notesDescription Required", statusCode: 400 })
    return
  } else {
    const checkExistingWeek = await lectureCollection.findOne({ courseId: req.body.courseId, "lecture.week": req.body.week })
    if (!checkExistingWeek) {
      res.status(400).json({ status: "error", message: `Week Not Exist! Plz Add week`, statusCode: 400 })
      return
    }
    const notesFile = req.file?.path ? await cloudinary.uploader.upload(req.file?.path, {resource_type: "auto" ,folder: `LectureData/week${req.body.week}/notes/` }) : ""

    const { week, courseId, notesIndex,notesTitle,notesDescription} = req.body;
    //Check week exist or not
    if (checkExistingWeek) {   
    const notesData = await lectureCollection.findOneAndUpdate(
      { courseId:courseId, "lecture.week": week },
      {
        $push: {
          'lecture.$.notesList': {
            $each: [{ 
              notesIndex:notesIndex,
              notesTitle:notesTitle,
              notesDescription:notesDescription,
              notesFile:notesFile.secure_url,          
              notescloudinaryId:notesFile.public_id            
            }],
            $position: 1
          }
        }
      },
      { new: true }
    ).populate('courseId')
    res.status(201).json({ status: "success", data: notesData, message: `Notes Added Successfully`, statusCode: 201 })
    }
  }
};

//  uploadassignment
module.exports.uploadassignment = async (req, res) => {
  if (!req.body?.courseId) {
    res.status(400).json({ status: "error", message: "courseId required", statusCode: 400 })
    return
  } else if (!req.body?.week) {
    res.status(400).json({ status: "error", message: "week Number Required", statusCode: 400 })
    return
  } else if (!req.body?. assignmentIndex) {
    res.status(400).json({ status: "error", message: " assignmentIndex Required", statusCode: 400 })
    return
  }else if (!req.body?. assignmentTitle) {
    res.status(400).json({ status: "error", message: " assignmentTitle Required", statusCode: 400 })
    return
  }else if (!req.body?. assignmentDescription) {
    res.status(400).json({ status: "error", message: " assignmentDescription Required", statusCode: 400 })
    return
  } else {
    const checkExistingWeek = await lectureCollection.findOne({ courseId: req.body.courseId, "lecture.week": req.body.week })
    if (!checkExistingWeek) {
      res.status(400).json({ status: "error", message: `Week Not Exist! Plz Add week`, statusCode: 400 })
      return
    }
    const  assignmentFile = req.file?.path ? await cloudinary.uploader.upload(req.file?.path, {resource_type: "auto" ,folder: `LectureData/week${req.body.week}/ assignment/` }) : ""

    const { week, courseId, assignmentIndex,assignmentTitle,assignmentDescription} = req.body;
    //Check week exist or not
    if (checkExistingWeek) {   
    const assignmentData = await lectureCollection.findOneAndUpdate(
      { courseId:courseId, "lecture.week": week },
      {
        $push: {
          'lecture.$.assignmentList': {
            $each: [{ 
              assignmentIndex:assignmentIndex,
              assignmentTitle:assignmentTitle,
              assignmentDescription:assignmentDescription,
              assignmentFile:assignmentFile.secure_url,          
              assignmentcloudinaryId:assignmentFile.public_id            
            }],
            $position: 1
          }
        }
      },
      { new: true }
    ).populate('courseId')
    res.status(201).json({ status: "success", data: assignmentData, message: `Assignment Added Successfully`, statusCode: 201 })
    }
  }
};

//  uploadQuiz
module.exports.uploadQuiz = async (req, res) => {
  if (!req.body?.courseId) {
    res.status(400).json({ status: "error", message: "courseId required", statusCode: 400 })
    return
  } else if (!req.body?.week) {
    res.status(400).json({ status: "error", message: "week Number Required", statusCode: 400 })
    return
  } else if (!req.body?.weeklyQuiz.question) {
    res.status(400).json({ status: "error", message: " Question Required", statusCode: 400 })
    return
  }else if (!req.body?.weeklyQuiz.answer) {
    res.status(400).json({ status: "error", message: " Correct Answer  Required", statusCode: 400 })
    return
  }else if (!req.body?.weeklyQuiz.choices) {
    res.status(400).json({ status: "error", message: " Plz Add choices in Array format", statusCode: 400 })
      return         
  }else if (req.body?.weeklyQuiz.choices.length < 2) {
    res.status(400).json({ status: "error", message: " At least two Choices Required Required", statusCode: 400 })
    return      
  }
 else {    
    const checkExistingWeek = await lectureCollection.findOne({ courseId: req.body.courseId, "lecture.week": req.body.week })
    if (!checkExistingWeek) {
      res.status(400).json({ status: "error", message: `Week Not Exist! Plz Add week`, statusCode: 400 })
      return
    }
    const { week, courseId,weeklyQuiz} = req.body;    
  //Check week exist or not
    if (checkExistingWeek) {   
    const weeklyQuizData = await lectureCollection.findOneAndUpdate(
      { courseId:courseId, "lecture.week": week },
      {
        $push: {
          'lecture.$.weeklyQuiz': {
            $each: [{weeklyQuiz}],
            $position: 1
          }
        }
      },
      { new: true }
    ).populate('courseId')
    res.status(201).json({ status: "success", data: weeklyQuizData, message: `Assignment Added Successfully`, statusCode: 201 })
    }
  }
};