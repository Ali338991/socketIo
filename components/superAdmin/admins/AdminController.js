var AdminList = require("./AdminModel");
let {sendEmail}=require('../../../utils/sendEmail');

//Function to add Admin
module.exports.addAdmin = async (req, res) => {
  const { name, userName, email, mobile, role, status } = req.body;
  const filename = req.file?.filename;
  if (!name || !userName || !email || !mobile || !role || !status) {
    res.status(400).send("All params are required");
  }
  const newAdminList = new AdminList({
    name, userName, email, mobile, role,
    status:"fullControl",
    image: filename,
  });
  newAdminList.save((err, success) => {
    if (err) {
      res.status(501).send("error happen");
    }
    res.status(200).send("Admin Added Successfully");
    sendEmail(email);
  });
};


module.exports.getAdminList = async (req, res) => {
  const getAdminList = await AdminList.find({});
  res.status(200).json(getAdminList);
};
//temporaryBlok
module.exports.temporaryBlok = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).send("All params are required");
  }
  const Admin = await AdminList.findByIdAndUpdate(id, {
    Status: "temporaryBlok",
  }, { new: true }
  )
  if (!Admin) {
    res.status(400).send("Your id is incorrect");
  }
  Admin.save((err, data) => {

    if (err) {
      res.status(501).send("error happen");
    }
    res.status(200).send("Admin Temporary Blok Successfully");
  });
};

module.exports.permanentBlok = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).send("All params are required");
  }
  const Admin = await AdminList.findByIdAndUpdate(id, {
    Status: "permanentBlok",
  }, { new: true }
  )
  if (!Admin) {
    res.status(400).send("Your id is incorrect");
  }
  Admin.save((err, data) => {

    if (err) {
      res.status(501).send("error happen");
    }
    res.status(200).send("Admin Permanent Blok Successfully");
  });
};

module.exports.fullControl = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).send("All params are required");
  }
  const Admin = await AdminList.findByIdAndUpdate(id, {
    Status: "fullControl",
  }, { new: true }
  )
  if (!Admin) {
    res.status(400).send("Your id is incorrect");
  }
  Admin.save((err, data) => {
    if (err) {
      res.status(501).send("error happen");
    }
    res.status(200).send("Now Admin has full Control");
  });
};

module.exports.updateAdmin = async (req, res) => {
  const { name, userName, email, mobile, role, status,id } = req.body;
  const filename = req.file?.filename;
  if (!id || !name || !userName || !email || !mobile || !role || !status) {
    res.status(400).send("All params are required");
  }
  const Admin = await AdminList.findByIdAndUpdate(id, {
    name, userName, email, mobile, role, status,
    image: filename,
  }, { new: true }
  )
  if (!Admin) {
    res.status(400).send("Your id is incorrect");
  }
  Admin.save((err, data) => {
    if (err) {
      res.status(501).send("error happen");
    }
    res.status(200).send("update Successful");
  });
};

module.exports.deleteAdmin = async (req, res) => {
  const {id} = req.body;   
 
  if (!id) {
    res.status(400).send("All params are required");
  }
  const Admin = await AdminList.findByIdAndDelete({_id:id});
  if (!Admin) {
    res.status(400).send("Your id is incorrect");
  }  
  res.status(200).send("Admin Delete Successfully");
};
