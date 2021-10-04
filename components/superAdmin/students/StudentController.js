var StudentList = require("./StudentModel");
let { sendEmail } = require('../../../utils/sendEmail');
const cloudinary = require('../../../config/Cloudinary');


//Add Student
module.exports.addStudent = async (req, res) => {
  if (!req.body?.name) {
    res.status(400).json({ status: "error", message: "Name required", statusCode: 400 })
    return
  } else if (!req.body?.userName) {
    res.status(400).json({ status: "error", message: "User Name Required", statusCode: 400 })
    return
  } else if (!req.body?.course) {
    res.status(400).json({ status: "error", message: "course Required", statusCode: 400 })
    return
  } else if (!req.body?.email) {
    res.status(400).json({ status: "error", message: "Email Required", statusCode: 400 })
    return
  } else if (!req.body?.mobile) {
    res.status(400).json({ status: "error", message: "Mobile Number  Required", statusCode: 400 })
    return
  } else {
    const check = await StudentList.findOne({ email: req.body?.email });
    if (check) {
      res.status(400).json({ status: "success", message: "Email already exist", statusCode: 400 })
      return
    }
    const filename = req.file?.path ? await cloudinary.uploader.upload(req.file?.path, { folder: "profile/Student/" }) : ""
    const { name, userName, email, mobile, course } = req.body;
    const newStudentList = new StudentList({
      name, userName, email, mobile, course,
      status: "fullControl",
      role: "student",
      image: filename?.secure_url,
      cloudinaryId: filename?.public_id,
    });
    const id = newStudentList?._id
    const yourRole = newStudentList?.role
    const portal = process.env.StudentPortal
    await sendEmail(id, portal, email, name, yourRole, res);
    newStudentList.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      let data = {
        id: success?._id,
        name: success?.name,
        userName: success?.userName,
        email: success?.email,
        mobile: success?.mobile,
        course: success?.course,
        status: success?.status,
        cloudinaryId: success?.cloudinaryId,
        image: success?.image,
        role: success?.role,
      };
      
      res.status(201).json({ status: "success", data: data, message: "Student Created and Send Email Successfully", statusCode: 201 })
      return
    });
  }
};
//Get List of Student
module.exports.getStudentList = async (req, res) => {
  try {
    const getStudentList = await StudentList.find({});

    let newGetStudentList = []
    getStudentList.map((success) => {
      newGetStudentList.push(
        {
          id: success?._id,
          name: success?.name,
          userName: success?.userName,
          email: success?.email,
          mobile: success?.mobile,
          course: success?.course,
          status: success?.status,
          cloudinaryId: success?.cloudinaryId,
          image: success?.image,
          role: success?.role,
        }
      );
    })
    res.status(202).json({ status: "success", message: "Get list of Student Successfully", data: newGetStudentList, statusCode: 202 })
    return
  } catch (error) {
    res.status(400).json({ status: "success", message: err?.message, statusCode: 400 })
    return
  }
};
//temporaryBlok
module.exports.temporaryBlok = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const Student = await StudentList.findByIdAndUpdate(id, {
      status: "temporaryBlok",
    }, { new: true }
    )
    if (!Student) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    Student.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      let data = {
        id: success?._id,
        name: success?.name,
        userName: success?.userName,
        email: success?.email,
        mobile: success?.mobile,
        course: success?.course,
        status: success?.status,
        cloudinaryId: success?.cloudinaryId,
        image: success?.image,
        role: success?.role,
      };
      res.status(201).json({ status: "success", data: data, message: "Student temporary blok Successfully", statusCode: 201 })
      return
    });

  }
};
//Permanent Blok 
module.exports.permanentBlok = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const Student = await StudentList.findByIdAndUpdate(id, {
      status: "permanentBlok",
    }, { new: true }
    )
    if (!Student) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    Student.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      let data = {
        id: success?._id,
        name: success?.name,
        userName: success?.userName,
        email: success?.email,
        mobile: success?.mobile,
        course: success?.course,
        status: success?.status,
        cloudinaryId: success?.cloudinaryId,
        image: success?.image,
        role: success?.role,
      };
      res.status(201).json({ status: "success", data: data, message: "Student permanent blok Successfully", statusCode: 201 })
      return
    });
  }
};
//fullControl
module.exports.fullControl = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const Student = await StudentList.findByIdAndUpdate(id, {
      status: "fullControl",
    }, { new: true }
    )
    if (!Student) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    Student.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      let data = {
        id: success?._id,
        name: success?.name,
        userName: success?.userName,
        email: success?.email,
        mobile: success?.mobile,
        course: success?.course,
        status: success?.status,
        cloudinaryId: success?.cloudinaryId,
        image: success?.image,
        role: success?.role,
      };
      res.status(201).json({ status: "success", data: data, message: "Now Student has FullControl", statusCode: 201 })
      return
    });
  }
};
//updateStudent
module.exports.updateStudent = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else if (!req.body?.name) {
    res.status(400).json({ status: "error", message: "Name required", statusCode: 400 })
    return
  } else if (!req.body?.userName) {
    res.status(400).json({ status: "error", message: "User Name Required", statusCode: 400 })
    return
  } else if (!req.body?.course) {
    res.status(400).json({ status: "error", message: "course Required", statusCode: 400 })
    return
  } else if (!req.body?.email) {
    res.status(400).json({ status: "error", message: "Email Required", statusCode: 400 })
    return
  } else if (!req.body?.mobile) {
    res.status(400).json({ status: "error", message: "Mobile Number  Required", statusCode: 400 })
    return
  } else {

    const findStudent = await StudentList.findById(req.body?.id);
    if (!findStudent) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }

    if (findStudent?.cloudinaryId) {
      await cloudinary.uploader.destroy(findStudent.cloudinaryId);    
      }
    const filename =req.file?.path?await cloudinary.uploader.upload(req.file?.path, { folder: "profile/Student/" }):"";
    const { name, userName, email, mobile, id, course } = req.body;
    const Student = await StudentList.findByIdAndUpdate(id, {
      name, userName, email, mobile, course,
      image: filename?.secure_url,
      cloudinaryId: filename?.public_id,
    }, { new: true }
    )

    Student.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      let data = {
        id: success?._id,
        name: success?.name,
        userName: success?.userName,
        email: success?.email,
        mobile: success?.mobile,
        course: success?.course,
        status: success?.status,
        cloudinaryId: success?.cloudinaryId,
        image: success?.image,
        role: success?.role,
      };
      res.status(201).json({ status: "success", data: data, message: "Update Student Successfully", statusCode: 201 })
      return
    });
  }
};
//deleteStudent
module.exports.deleteStudent = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const findStudent = await StudentList.findById(id);
    if (!findStudent) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    if (findStudent?.cloudinaryId) {
      await cloudinary.uploader.destroy(findStudent.cloudinaryId);    
      }
    const Student = await StudentList.findByIdAndDelete(id);
    if (!Student) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    res.status(201).json({ status: "success", message: "Student  Delete Successfully", statusCode: 201 })
    return
  }


};
