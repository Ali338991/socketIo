var AdminList = require("./AdminModel");






//Function to add Admin

module.exports.addAdmin = async (req, res) => {
  console.log("addAdmin", req.body);
  const { name, userName, email, mobile, role, status } = req.body;
  const filename = req.file.filename;
  console.log("fileName", filename);
  if (!name || !userName || !email || !mobile || !role || !status) {
    res.status(400).send("All params are required");
  }

  const newAdminList = new AdminList({
    name, userName, email, mobile, role, status,
    image: filename,

  });
  console.log("newAdminList", newAdminList);


  newAdminList.save((err, success) => {
    //token create?
    console.log("newAdminList", success);

    if (err) {
      res.status(501).send("error happen");
    }
    console.log("About To");
    res.status(200).send("Admin Added Successfully");
    console.log("Done");

  });
};


module.exports.getAdminList = async (req, res) => {

  const getAdminList = await AdminList.find({});
  console.log("getAdminList", getAdminList);
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
