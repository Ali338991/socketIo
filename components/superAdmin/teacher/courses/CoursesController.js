var CoursesList = require("./CoursesModel");
let { launchCourse } = require('../../../../utils/sendEmail');
var AdminList = require("../../admins/AdminModel");
const cloudinary  = require('../../../../config/Cloudinary');

//Add Courses
module.exports.launchCourse = async (req, res) => {
  if (!req.body?.instructorName) {
    res.status(400).json({ status: "error", message: "InstructorName required", statusCode: 400 })
    return
  } else if (!req.body?.courseName) {
    res.status(400).json({ status: "error", message: "course Name Required", statusCode: 400 })
    return
  } else if (!req.body?.teacherEmail) {
    res.status(400).json({ status: "error", message: "Teacher Email Required", statusCode: 400 })
    return
  } else {
    const check = await CoursesList.findOne({ courseName: req.body?.courseName });
    if (check) {
      res.status(400).json({ status: "success", message: "course already exist", statusCode: 400 })
      return
    }
    const teacher = await AdminList.findOne({ email: req.body?.teacherEmail })

    // Save new Course into DataBase
    const { courseName, instructorName, teacherEmail } = req.body;
    const newCoursesList = new CoursesList({
      courseName, instructorName, teacherEmail,
      status: 'unPublish',
      image:teacher?.image
    });
    const email = newCoursesList?.teacherEmail
    const course = newCoursesList?.courseName
    const portal = process.env.TeacherPortal
    await launchCourse(portal, email, course, res);
    //add course Id to teacher object
    const teacherData = await AdminList.findByIdAndUpdate(teacher._id, {
       $push: { assignCourse: newCoursesList._id } 
    }, { new: true }
    )
    //End
    newCoursesList.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      let data = {
        id: success?._id,
        courseName: success?.courseName,
        instructorName: success?.instructorName,
        teacherEmail: success?.teacherEmail,
        status: success?.status,
        image:success?.image
      };
      res.status(201).json({ status: "success", data: data, message: "Course Launched and Send Email to Teacher  Successfully", statusCode: 201 })
      return
    });
  }
};
//Get List of Courses
module.exports.getCoursesList = async (req, res) => {
  try {
    const getCoursesList = await CoursesList.find({});
    let newGetCurseList = []
    getCoursesList.map((success) => {
      newGetCurseList.push(
        {
          id: success?._id,
          courseName: success?.courseName,
          instructorName: success?.instructorName,
          teacherEmail: success?.teacherEmail,
          status: success?.status,
          video:success.video,
          image:success?.image
        }
      );
    })
    res.status(202).json({ status: "success", message: "Get list of Courses Successfully", data: newGetCurseList, statusCode: 202 })
    return
  } catch (error) {
    res.status(400).json({ status: "success", message: err?.message, statusCode: 400 })
    return
  }
};

//deleteCourses
module.exports.deleteCourses = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const findCourses = await CoursesList.findById({ _id: id });
    if (!findCourses) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    // await cloudinary.uploader.destroy(findCourses.cloudinaryId);
    const Courses = await CoursesList.findByIdAndDelete({ _id: id });
    if (!Courses) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    res.status(201).json({ status: "success", message: "Courses  Delete Successfully", statusCode: 201 })
    return
  }


};
//doCourseOnline
module.exports.doCoursePublish = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const Course = await CoursesList.findByIdAndUpdate(id, {
      status: "publish",
    }, { new: true }
    )
    if (!Course) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    Course.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      let data = {
        id: success?._id,
        courseName: success?.courseName,
        instructorName: success?.instructorName,
        teacherEmail: success?.teacherEmail,
        status: success?.status,
      };
      res.status(201).json({ status: "success", data: data, message: "Course Online Successfully", statusCode: 201 })
      return
    });

  }
};
//doCourseBlok
module.exports.doCourseUnPublish = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const Course = await CoursesList.findByIdAndUpdate(id, {
      status: "unPublish",
    }, { new: true }
    )
    if (!Course) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    Course.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      let data = {
        id: success?._id,
        courseName: success?.courseName,
        instructorName: success?.instructorName,
        teacherEmail: success?.teacherEmail,
        status: success?.status,
      };
      res.status(201).json({ status: "success", data: data, message: "Course Blok Successfully", statusCode: 201 })
      return
    });

  }
};
module.exports.courseSetup = async (req, res) => {
  try {
    if (!req.body?.id) {
      res.status(400).json({ status: "error", message: "Course id required", statusCode: 400 })
      return
    }else if(!req.body?.courseBrief){
      res.status(400).json({ status: "error", message: "Course Detail Description Required", statusCode: 400 })
      return
    }else if(!req.body?.intro){
      res.status(400).json({ status: "error", message: "Course Intro Video Url Required", statusCode: 400 })
      return
    }else{
      const { intro,courseBrief,id} = req.body;     
      const course = await CoursesList.findById(id);
      if (course?.cloudinaryId) {
        await cloudinary.uploader.destroy(course.coverCloudinaryId)      
      }
    const cover =req.file?.path?await cloudinary.uploader.upload(req.file?.path,{ folder: `courses/${course.courseName}/`}):""
        const Course = await CoursesList.findByIdAndUpdate(id, {
          courseBrief,
          intro:intro,
          cover:cover.secure_url,
          }, { new: true }
        )
        if (!Course) {
          res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
          return
        }
        Course.save((err, success) => {
          if (err) {
            res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
            return
          }     
          res.status(201).json({ status: "success", data: success, message: "Course Setup Done Successfully", statusCode: 201 })
          return
        });
    
      }
    
  } catch (error) {
    res.status(400).json({ status: "error", message: error?.message, statusCode: 400 })
return
    
  }
};