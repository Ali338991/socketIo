var AdminList = require("./AdminModel");
var bycrypt = require("bcryptjs")
var jwt = require("jsonwebtoken");
let { sendEmail } = require('../../../utils/sendEmail');
const cloudinary  = require('../../../config/Cloudinary');

//login
module.exports.login = async (req, res) => {
  if (!req.body?.email) {
    res.status(400).json({ status: "error", message: "email required", statusCode: 400 })
    return
  } else if (!req.body?.password) {
    res.status(400).json({ status: "error", message: "password Required", statusCode: 400 })
    return
  } else {
    const { email, password } = req.body;
    const admin = await AdminList.findOne({ email: email });
    if (!admin) {
      res.status(400).json({ status: "error", message: "Email not found", statusCode: 400 })
      return
    } else if (!await bycrypt.compare(password, admin.password)) {
      res.status(400).json({ status: "error", message: "Your password is not correct", statusCode: 400 })
      return
    }
    var token = await jwt.sign(
      { email: admin.email, name: admin.name },
      process.env.jwtKey
    );
    let adminRecord = {
      name: admin.name,
      userName: admin.userName,
      email: admin.email,
      mobile: admin.mobile,
      phone: admin.phone,
      token,
    };
    res.status(202).json({ status: "success", message: "Admin get successfully", data: adminRecord, statusCode: 202 })


  }




};
//Add Admin
module.exports.addAdmin = async (req, res) => {
  if (!req.body?.name) {
    res.status(400).json({ status: "error", message: "Name required", statusCode: 400 })
    return
  } else if (!req.body?.userName) {
    res.status(400).json({ status: "error", message: "User Name Required", statusCode: 400 })
    return
  } else if (!req.body?.email) {
    res.status(400).json({ status: "error", message: "Email Required", statusCode: 400 })
    return
  } else if (!req.body?.mobile) {
    res.status(400).json({ status: "error", message: "Mobile Number  Required", statusCode: 400 })
    return
  } else {
    const check = await AdminList.findOne({ email: req.body?.email });
    if (check) {
      res.status(400).json({ status: "success", message: "Email already exist", statusCode: 400 })
      return
    }
    const filename = await cloudinary.uploader.upload(req.file?.path,{ folder: "profile/Admin/" });
    const { name, userName, email, mobile } = req.body;
    const newAdminList = new AdminList({
      name, userName, email, mobile,
      status: "fullControl",
      role: "Admin",
      image: filename?.secure_url,
      cloudinaryId:filename?.public_id,
    });
    const id = newAdminList?._id
    const yourRole = newAdminList?.role
    const portal = process.env.AdminPortal
    await sendEmail(id, portal, email, name, yourRole, res);
    newAdminList.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      res.status(201).json({ status: "success", data: success, message: "Admin Created and Send Email Successfully", statusCode: 201 })
      return
    });
  }
};
//Get List of Admin
module.exports.getAdminList = async (req, res) => {
  try {
    const getAdminList = await AdminList.find({});
    res.status(202).json({ status: "success", message: "Get list of Admin Successfully", data: getAdminList, statusCode: 202 })
    return
  } catch (error) {
    res.status(400).json({ status: "success", message: { error }, statusCode: 400 })
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
    const Admin = await AdminList.findByIdAndUpdate(id, {
      status: "temporaryBlok",
    }, { new: true }
    )
    if (!Admin) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    Admin.save((err, data) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      res.status(201).json({ status: "success", data: data, message: "Admin temporary blok Successfully", statusCode: 201 })
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
    const Admin = await AdminList.findByIdAndUpdate(id, {
      status: "permanentBlok",
    }, { new: true }
    )
    if (!Admin) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    Admin.save((err, data) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      res.status(201).json({ status: "success", data: data, message: "Admin permanent blok Successfully", statusCode: 201 })
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
    const Admin = await AdminList.findByIdAndUpdate(id, {
      status: "fullControl",
    }, { new: true }
    )
    if (!Admin) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    Admin.save((err, data) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      res.status(201).json({ status: "success", data: data, message: "Now Admin has FullControl", statusCode: 201 })
      return
    });
  }
};
//updateAdmin
module.exports.updateAdmin = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else if (!req.body?.name) {
    res.status(400).json({ status: "error", message: "Name required", statusCode: 400 })
    return
  } else if (!req.body?.userName) {
    res.status(400).json({ status: "error", message: "User Name Required", statusCode: 400 })
    return
  } else if (!req.body?.email) {
    res.status(400).json({ status: "error", message: "Email Required", statusCode: 400 })
    return
  } else if (!req.body?.mobile) {
    res.status(400).json({ status: "error", message: "Mobile Number  Required", statusCode: 400 })
    return
  } else {
    const  findAdmin = await AdminList.findById(req.body?.id);
    if (!findAdmin) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }  
    await cloudinary.uploader.destroy(findAdmin.cloudinaryId);
    const filename = await cloudinary.uploader.upload(req.file?.path,{ folder: "profile/" });    
    const { name, userName, email, mobile, id } = req.body;
    const Admin = await AdminList.findByIdAndUpdate(id, {
      name, userName, email, mobile,
      image: filename?.secure_url,
      cloudinaryId:filename?.public_id,
    }, { new: true }
    )
   
    Admin.save((err, data) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      res.status(201).json({ status: "success", data: data, message: "Update Admin Successfully", statusCode: 201 })
      return
    });
  }
};
//Delete Admin
module.exports.deleteAdmin = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const  findAdmin = await AdminList.findById({_id:id});
    if (!findAdmin) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    await cloudinary.uploader.destroy(findAdmin.cloudinaryId);
    const Admin = await AdminList.findByIdAndDelete({ _id: id });
    if (!Admin) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    res.status(201).json({ status: "success", message: "Admin  Delete Successfully", statusCode: 201 })
    return
  }


};

//get Data
module.exports.getData = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const  findAdmin = await AdminList.findById({_id:id});
    if (!findAdmin) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
  
    res.status(201).json({ status: "success",data:findAdmin, message: "Admin get Successfully", statusCode: 201 })
    return
  }


};

module.exports.signUp = async (req, res) => {
  console.log("asd",req.body);
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else if (!req.body?.name) {
    res.status(400).json({ status: "error", message: "Name required", statusCode: 400 })
    return
  } else if (!req.body?.userName) {
    res.status(400).json({ status: "error", message: "User Name Required", statusCode: 400 })
    return
  }else if (!req.body?.password) {
    res.status(400).json({ status: "error", message: "User Name Required", statusCode: 400 })
    return
  }else {
    console.log("run");
    
    const  findAdmin = await AdminList.findById(req.body?.id);
    if (!findAdmin) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }  
    console.log("run2");
    if (findAdmin?.password) {
      res.status(400).json({ status: "error", message: "Your already have account", statusCode: 400 })
      return      
    }
    const { name, userName,password ,id} = req.body;
  const encryptedPassword = await bycrypt.hash(password, 10);
    const Admin = await AdminList.findByIdAndUpdate({_id:id}, {
      name, userName,  
      password: encryptedPassword,
    }, { new: true }
    )
   
    Admin.save((err, data) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      res.status(201).json({ status: "success", message: "Account Created Successfully", statusCode: 201 })
      return
    });
  }
};

