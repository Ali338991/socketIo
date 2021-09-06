var AdminList = require("./AdminModel");
const multer  = require('multer')




//AdminList
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profile/')
  },
  filename: function (req, file, cb) {  
    cb(null, Date.now() + file.originalname)
  }
})
const upload = multer({ storage: storage })
module.exports.uploadImage = upload.single('photo');
//Function to add Admin

module.exports.addAdmin = async (req, res) => {
  console.log("addAdmin", req.body);
  const {Name,UserName,Email,Mobile,Role,Status} = req.body;
  const filename = req.file.filename;
  console.log("fileName",filename);

  const newAdminList = new AdminList({
    Name,UserName,Email,Mobile,Role,Status,
    Image:filename,
    
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


module.exports.DeleteCourse = async (req, res) => {
  const {docId} = req.body;   
  await courseList.findByIdAndDelete({_id : docId});  
  res.status(200).send("Course Delete Successfully");


};
