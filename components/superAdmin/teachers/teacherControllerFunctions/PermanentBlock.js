var teacherObject = require("../TeacherModel");

module.exports.PermanentBlock = async (req, res) => {
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
}

