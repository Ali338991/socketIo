var teacherObject = require('./TeacherModel');

module.exports.addTeacher = (req, res) => {
  const { name, userName, email, mobileNumber, cnic, address, fullControlStatus, permanentBlockStatus, temporaryBlockStatus } = req.body;
  const fileName = req.file?.filename;
  const addTeacherInDb = new teacherObject({
    name, userName, email, mobileNumber, cnic, address, fullControlStatus, permanentBlockStatus, temporaryBlockStatus,
    image: fileName,
  });
  await addTeacherInDb.save((err, success) => {
    if (err) {
      res.status(501).send(err.message);
    }
    res.status(200).send("Teacher Added Successfully");
  });
};

module.exports.getTeachers = (req, res) => {
  await teacherObject.find({}, (err, data) => {
    if (err) {
      res.send(err.message);
    }
    res.status(200).json(data);
  });
};

module.exports.temporaryBlock = (req, res) => {
  const { id ,temporaryBlockStatus} = req.body;
  if (!id) {
    res.status(400).send("Teacher Id not found");
  }
  const teacher = await teacherObject.findByIdAndUpdate(id, {
    temporaryBlockStatus,
    permanentBlockStatus: false,
    fullControlStatus: false,
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
  const { id } = req.body;
  if (!id) {
      res.status(400).send("Teacher Id not found");
  }
  const teacher = await teacherObject.findByIdAndUpdate(id, {
      permanentBlockStatus: true,
      temporaryBlockStatus: false,
      fullControlStatus: false,
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

module.exports.fullControl = async (req, res) => {
  const { id ,fullControlStatus} = req.body;
  if (!id) {
    res.status(400).send("Teacher Id not found");
  }
  const teacher = await teacherObject.findByIdAndUpdate(id, {
    fullControlStatus,
    permanentBlockStatus: false,
    temporaryBlockStatus: false,
  }
  )
  if (!teacher) {
    res.status(400).send("Teacher not found");
  }
  teacher.save((err, data) => {
    if (err) {
      res.status(501).send(err.message);
    }
    res.status(200).send("Now Teacher have full Control");
  });
};

module.exports.updateTeacher = async (req, res) => {
  const { name, userName, email, mobileNumber, cnic, address, fullControlStatus, permanentBlockStatus, temporaryBlockStatus, id } = req.body;
  const fileName = req.file?.filename;
  const teacher = await teacherObject.findByIdAndUpdate(id, {
      name, userName, email, mobileNumber, cnic, address, fullControlStatus, permanentBlockStatus, temporaryBlockStatus,
      image: fileName,
  }
  )
  if (!teacher) {
      res.status(400).send("Teacher not found");
  }
  teacher.save((err, data) => {
      if (err) {
          res.status(501).send(err.message);
      }
      res.status(200).send("Updated Successfully");
  });const { name, userName, email, mobileNumber, cnic, address, fullControlStatus, permanentBlockStatus, temporaryBlockStatus, id } = req.body;
    const fileName = req.file?.filename;
    const teacher = await teacherObject.findByIdAndUpdate(id, {
        name, userName, email, mobileNumber, cnic, address, fullControlStatus, permanentBlockStatus, temporaryBlockStatus,
        image: fileName,
    }
    )
    if (!teacher) {
        res.status(400).send("Teacher not found");
    }
    teacher.save((err, data) => {
        if (err) {
            res.status(501).send(err.message);
        }
        res.status(200).send("Updated Successfully");
    });
};

module.exports.deleteTeacher = async (req, res) => {
  const { id } = req.body;
    if (!id) {
        res.status(400).send("Teacher id not found");
    }
    const teacher = await teacherObject.findByIdAndDelete({ _id: id });
    if (!teacher) {
        res.status(400).send("Teacher not found");
    }
    res.status(200).send("Teacher deleted Successfully");
};
