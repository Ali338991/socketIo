var teacherObject=require('../TeacherModel');

module.exports.AddTeacher=async(req,res)=>{
    const {name,userName,email,mobileNumber,cnic,address,fullControlStatus,permanentBlockStatus,temporaryBlockStatus} = req.body;
    const fileName = req.file?.filename;
    const addTeacherInDb = new teacherObject({
      name,userName,email,mobileNumber,cnic,address,fullControlStatus,permanentBlockStatus,temporaryBlockStatus,
      image: fileName,
    });
      await addTeacherInDb.save((err, success) => {
      if (err) {
        res.status(501).send(err.message);
      }
      res.status(200).send("Teacher Added Successfully");
    });
}