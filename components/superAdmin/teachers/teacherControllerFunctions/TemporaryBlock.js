var teacherObject = require("../TeacherModel");

module.exports.TemporaryBlock=async(req,res)=>{
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
}