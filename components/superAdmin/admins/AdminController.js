var AdminList = require("./AdminModel");
let { sendEmail } = require('../../../utils/sendEmail');

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
    const filename = req.file?.filename;
    const { name, userName, email, mobile } = req.body;
    const newAdminList = new AdminList({
      name, userName, email, mobile,
      status: "fullControl",
      role: "Admin",
      image: filename,
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
      res.status(201).json({ status: "success",data:success, message: "Admin Created and Send Email Successfully", statusCode: 201 })
      return
    });
  }
};
//Get List of Admin
module.exports.getAdminList = async (req, res) => {
  try {
    const getAdminList = await AdminList.find({});
    res.status(202).json({ status: "success", message: "Get list of Admin Successfully", data:getAdminList , statusCode: 202 })
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
      res.status(201).json({ status: "success",data:data, message: "Admin temporary blok Successfully", statusCode: 201 })
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
      res.status(201).json({ status: "success",data:data, message: "Admin permanent blok Successfully", statusCode: 201 })
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
      res.status(201).json({ status: "success",data:data, message: "Now Admin has FullControl", statusCode: 201 })
      return
    });
  }
};
//updateAdmin
module.exports.updateAdmin = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return    
  }else if (!req.body?.name) {
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
  }else{
  const { name, userName, email, mobile,id } = req.body;
  const filename = req.file?.filename;
  const Admin = await AdminList.findByIdAndUpdate(id, {
    name, userName, email, mobile,
    image: filename,
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
      res.status(201).json({ status: "success",data:data, message: "Update Admin Successfully", statusCode: 201 })
      return
    });
  }  
};
//Delete Admin
module.exports.deleteAdmin = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return    
  }else{
    const { id } = req.body;
    const Admin = await AdminList.findByIdAndDelete({ _id: id });
    if (!Admin) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
       return
    }
    res.status(201).json({ status: "success", message: "Admin  Delete Successfully", statusCode: 201 })
    return
  }


};
