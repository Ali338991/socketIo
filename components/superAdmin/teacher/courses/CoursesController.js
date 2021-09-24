var CoursesList = require("./CoursesModel");
let { launchCourse } = require('../../../../utils/sendEmail');


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
  }else {
    const check = await CoursesList.findOne({ courseName: req.body?.courseName });
    if (check) {
      res.status(400).json({ status: "success", message: "course already exist", statusCode: 400 })
      return
    }
    const {courseName,instructorName,teacherEmail} = req.body;
    const newCoursesList = new CoursesList({
      courseName,instructorName, teacherEmail, 
      status:'blok',  
    });
    const email = newCoursesList?.teacherEmail
    const course = newCoursesList?.courseName
    const portal = process.env.TeacherPortal
    await launchCourse(portal,email,course,res);
    newCoursesList.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      let data = {
        id:success?._id,
        courseName: success?.courseName,
        instructorName: success?.instructorName,
        teacherEmail: success?.teacherEmail,
        status: success?.status,              
      };
      res.status(201).json({ status: "success",data:data, message: "Course Launched and Send Email to Teacher  Successfully", statusCode: 201 })
      return
    });
  }
};
//Get List of Courses
module.exports.getCoursesList = async (req, res) => {
  try {
    const getCoursesList = await CoursesList.find({});
    let newGetCurseList = []
    getCoursesList.map((item)=>{      
      newGetCurseList.push(
        {  
        id:success?._id,
        courseName: success?.courseName,
        instructorName: success?.instructorName,
        teacherEmail: success?.teacherEmail,
        status: success?.status,  
        }
      );
    })
    res.status(202).json({ status: "success", message: "Get list of Courses Successfully", data:newGetCurseList , statusCode: 202 })
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
  }else{
    const { id } = req.body;
    const  findCourses = await CoursesList.findById({_id:id});
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
module.exports.doCourseOnline = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const Course = await CoursesList.findByIdAndUpdate(id, {
      status: "online",
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
        id:success?._id,
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
module.exports.doCourseBlok = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const Course = await CoursesList.findByIdAndUpdate(id, {
      status: "blok",
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
        id:success?._id,
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