var teacherObject = require("../TeacherModel");

module.exports.FullControl =async(req,res)=>{
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
}