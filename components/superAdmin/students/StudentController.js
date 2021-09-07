var StudentList = require("./StudentModel");
//Function to add Student
module.exports.addStudent = async (req, res) => {
  console.log("addStudent", req.body);
  const { name, userName, email, mobile, role, status,course } = req.body;
  const filename = req.file?.filename;
  console.log("fileName", filename);
  if (!name || !userName || !email || !mobile || !role || !status || !course) {
    res.status(400).send("All params are required");
  }
  const newStudentList = new StudentList({
    name, userName, email, mobile, role, status,course,
    image: filename,

  });
  console.log("newStudentList", newStudentList);
  newStudentList.save((err, success) => {
    //token create?
    console.log("newStudentList", success);

    if (err) {
      res.status(501).send("error happen");
    }
    console.log("About To");
    res.status(200).send("Student Added Successfully");
    console.log("Done");
  });
};


module.exports.getStudentList = async (req, res) => {
  const getStudentList = await StudentList.find({});
  console.log("getStudentList", getStudentList);
  res.status(200).json(getStudentList);
};
//temporaryBlok
module.exports.temporaryBlok = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).send("All params are required");
  }
  const Student = await StudentList.findByIdAndUpdate(id, {
    Status: "temporaryBlok",
  }, { new: true }
  )
  if (!Student) {
    res.status(400).send("Your id is incorrect");
  }
  Student.save((err, data) => {
    if (err) {
      res.status(501).send("error happen");
    }
    res.status(200).send("Student Temporary Blok Successfully");
  });
};

module.exports.permanentBlok = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).send("All params are required");
  }
    const Student = await StudentList.findByIdAndUpdate(id, {
    Status: "permanentBlok",
  }, { new: true }
  )
  if (!Student) {
    res.status(400).send("Your id is incorrect");
  }
  Student.save((err, data) => {
    if (err) {
      res.status(501).send("error happen");
    }
    res.status(200).send("Student Permanent Blok Successfully");
  });
};

module.exports.fullControl = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).send("All params are required");
  }
  const Student = await StudentList.findByIdAndUpdate(id, {
    Status: "fullControl",
  }, { new: true }
  )
  if (!Student) {
    res.status(400).send("Your id is incorrect");
  }
  Student.save((err, data) => {
    if (err) {
      res.status(501).send("error happen");
    }
    res.status(200).send("Now Student has full Control");
  });
};

module.exports.updateStudent = async (req, res) => {
  const { name, userName, email, mobile, role, status,id,course} = req.body;
  const filename = req.file?.filename;
  console.log("fileName", filename);
  if (!id || !name || !userName || !email || !mobile || !role || !status || !course) {
    res.status(400).send("All params are required");
  }
  const Student = await StudentList.findByIdAndUpdate(id, {
    name, userName, email, mobile, role, status,course,
    image: filename,
  }, { new: true }
  )
  if (!Student) {
    res.status(400).send("Your id is incorrect");
  }
  Student.save((err, data) => {
    if (err) {
      res.status(501).send("error happen");
    }
    res.status(200).send("update Successful");
  });
};

module.exports.deleteStudent = async (req, res) => {
  const {id} = req.body;   
   if (!id) {
    res.status(400).send("All params are required");
  }
  const Student = await StudentList.findByIdAndDelete({_id:id});
  if (!Student) {
    res.status(400).send("Your id is incorrect");
  }  
  res.status(200).send("Student Delete Successfully");
};
