var teacherObject = require("../TeacherModel");

module.exports.DeleteTeacher = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        res.status(400).send("Teacher id not found");
    }
    const teacher = await teacherObject.findByIdAndDelete({ _id: id });
    if (!teacher) {
        res.status(400).send("Teacher not found");
    }
    res.status(200).send("Teacher deleted Successfully");
}
