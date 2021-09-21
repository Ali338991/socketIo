var teacherObject = require('../admins/AdminModel');
const cloudinary  = require('../../../config/Cloudinary');
let { sendEmail } = require('../../../utils/sendEmail');

//add teacher
module.exports.addTeacher = async (req, res) => {
  if (!req.body?.name) {
    res.status(400).json({ status: "error", message: "Name required", statusCode: 400 })
    return
  } else if (!req.body?.userName) {
    res.status(400).json({ status: "error", message: "User Name Required", statusCode: 400 })
    return
  }else if (!req.body?.email) {
    res.status(400).json({ status: "error", message: "email Required", statusCode: 400 })
    return
  }else if (!req.body?.mobile) {
    res.status(400).json({ status: "error", message: "mobile Required", statusCode: 400 })
    return
  }else if (!req.body?.cnic) {
    res.status(400).json({ status: "error", message: "cnic Required", statusCode: 400 })
    return
  }else if (!req.body?.address) {
    res.status(400).json({ status: "error", message: "address Required", statusCode: 400 })
    return
  }else{
    const check = await teacherObject.findOne({ email: req.body?.email });
    if (check) {
      res.status(400).json({ status: "success", message: "Email already exist", statusCode: 400 })
      return
    }
    const filename = await cloudinary.uploader.upload(req.file?.path,{ folder: "profile/Teacher/" });
  const { name, userName, email, mobile, cnic, address } = req.body;
  const addTeacherInDb = new teacherObject({
    name, userName, email, mobile, cnic, address, 
    status: "fullControl",    
    image: filename?.secure_url,
    cloudinaryId:filename?.public_id,
    role: "teacher",
  });
  const id = addTeacherInDb?._id
  const yourRole = addTeacherInDb?.role
  const portal = process.env.AdminPortal
  await sendEmail(id, portal, email, name, yourRole, res);
  await addTeacherInDb.save((err, data) => {
    if (err) {
      res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
      return
    }
    res.status(201).json({ status: "success", data: data, message: "Teacher Created and Send Email Successfully", statusCode: 201 })
    return
  });
  }
};

module.exports.getTeachers = async (req, res) => {
  try {
    const getTeacherList =  await teacherObject.find({role:'teacher'})
    res.status(202).json({ status: "success", message: "Get list of Teacher Successfully", data: getTeacherList, statusCode: 202 })
    return
  } catch (error) {
    res.status(400).json({ status: "success", message:error.message, statusCode: 400 })
    return
  }
};

module.exports.temporaryBlock = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const Teacher = await teacherObject.findByIdAndUpdate(id, {
      status: "temporaryBlok",
    }, { new: true }
    )
    if (!Teacher) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
   await Teacher.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      let data = {
        id:success?._id,
        name: success?.name,
        userName: success?.userName,
        email: success?.email,
        mobile: success?.mobile,
        status:success?.status,
        cloudinaryId:success?.cloudinaryId,
        image:success?.image,
        role:success?.role,        
      };
      res.status(201).json({ status: "success", data: data, message: "Teacher temporary blok Successfully", statusCode: 201 })
      return
    });
  }
};

module.exports.permanentBlock = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const Teacher = await teacherObject.findByIdAndUpdate(id, {
      status: "permanentBlok",
    }, { new: true }
    )
    if (!Teacher) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
  await Teacher.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      let data = {
        id:success?._id,
        name: success?.name,
        userName: success?.userName,
        email: success?.email,
        mobile: success?.mobile,
        status:success?.status,
        cloudinaryId:success?.cloudinaryId,
        image:success?.image,
        role:success?.role,        
      };
      res.status(201).json({ status: "success", data: data, message: "Teacher permanent blok Successfully", statusCode: 201 })
      return
    });
  }
};

module.exports.fullControl = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const Teacher = await teacherObject.findByIdAndUpdate(id, {
      status: "fullControl",
    }, { new: true }
    )
    if (!Teacher) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
  await  Teacher.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      let data = {
        id:success?._id,
        name: success?.name,
        userName: success?.userName,
        email: success?.email,
        mobile: success?.mobile,
        status:success?.status,
        cloudinaryId:success?.cloudinaryId,
        image:success?.image,
        role:success?.role,        
      };
      res.status(201).json({ status: "success", data: data, message: "Now Teacher has FullControl", statusCode: 201 })
      return
    });
  }  
};

module.exports.updateTeacher = async (req, res) => {
  if (!req.body?.name) {
    res.status(400).json({ status: "error", message: "Name required", statusCode: 400 })
    return
  } else if (!req.body?.userName) {
    res.status(400).json({ status: "error", message: "User Name Required", statusCode: 400 })
    return
  } else if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id Required", statusCode: 400 })
    return
  }else if (!req.body?.email) {
    res.status(400).json({ status: "error", message: "email Required", statusCode: 400 })
    return
  }else if (!req.body?.mobile) {
    res.status(400).json({ status: "error", message: "mobile Required", statusCode: 400 })
    return
  }else if (!req.body?.cnic) {
    res.status(400).json({ status: "error", message: "cnic Required", statusCode: 400 })
    return
  }else if (!req.body?.address) {
    res.status(400).json({ status: "error", message: "address Required", statusCode: 400 })
    return
  }else{
    const  findTeacher = await teacherObject.findById({_id: req.body?.id});
    if (!findTeacher) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    await cloudinary.uploader.destroy(findTeacher.cloudinaryId);
    const filename = await cloudinary.uploader.upload(req.file?.path,{ folder: "profile/Teacher/" });
  const { name, userName, email, mobile, cnic, address ,id} = req.body;
  const addTeacherInDb = await teacherObject.findByIdAndUpdate(id, {
    name, userName, email, mobile, cnic, address,     
    image: filename?.secure_url,
    cloudinaryId:filename?.public_id,
  }, { new: true }
  )
  await addTeacherInDb.save((err, success) => {
    if (err) {
      res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
      return
    }
    let data = {
      id:success?._id,
      name: success?.name,
      userName: success?.userName,
      email: success?.email,
      mobile: success?.mobile,
      status:success?.status,
      cloudinaryId:success?.cloudinaryId,
      image:success?.image,
      role:success?.role,        
    };
    res.status(201).json({ status: "success", data: data, message: "Update Successful", statusCode: 201 })
    return
  });
  }
};

module.exports.deleteTeacher = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const  findTeacher = await teacherObject.findById({_id:id});
    if (!findTeacher) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    await cloudinary.uploader.destroy(findTeacher.cloudinaryId);
    const Teacher = await teacherObject.findByIdAndDelete({ _id: id });
    if (!Teacher) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    res.status(201).json({ status: "success", message: "Teacher  Delete Successfully", statusCode: 201 })
    return
  }
};

