var teacherObject = require("../TeacherModel");

module.exports.GetTeachers =async(req,res)=>{
    await teacherObject.find({}, (err, data) => {
        if (err) {
          res.send(err.message);
        }
        res.status(200).json(data);
      });
}