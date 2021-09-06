var teacherObject = require("./TeacherModel");

module.exports.addTeacher = async (req, res) => {
  const {name,userName,email,mobileNumber,blockStatus,cnic,address} = req.body;
  const fileName = req.file.filename;
  const addTeacherInDb = new teacherObject({
    name,userName,email,mobileNumber,blockStatus,cnic,address,
    image: fileName,
  });
    addTeacherInDb.save((err, success) => {
    if (err) {
      res.status(501).send(err.message);
    }
    res.status(200).send("Teacher Added Successfully");
  });
};

module.exports.getTeachers = async (req, res) => {
  await teacherObject.find({}, (err, data) => {
    if (err) {
      res.send(err.message);
    }
    res.status(200).json(data);
  });
};

module.exports.temporaryBlock = async (req, res) => {
  const {id } = req.body;
  if(!id){
    res.status(400).send("User Id not found");
  }
  const teacher = await teacherObject.findByIdAndUpdate(id, {
    temporaryBlockStatus:true,
    permanentBlockStatus:false,
  }
    )
    if (!teacher) {
        res.status(400).send("Teacher not found");
      }

  teacher.save((err, data) => {
    if (err) {
      res.status(501).send(err.message);
    } 
    res.status(200).send("Teacher Temporary Block Successfully");
  });
};

module.exports.permanentBlock = async (req, res) => {
  const {id } = req.body;
//   if(!id){
//     res.status(400).send("User Id not found");
//   }
  const teacher = await teacherObject.findByIdAndUpdate("613634aa7a255b02f0157bd0", {
    permanentBlockStatus:true,
    temporaryBlockStatus:false,
  }
    )
    if (!teacher) {
        res.status(400).send("Teacher not found");
      }
  teacher.save((err, data) => {
    if (err) {
      res.status(501).send(err.message);
    } 
    res.status(200).send("Teacher Permanent Block Successfully");
  });
};

