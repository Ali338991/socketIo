var teacherObject = require("../TeacherModel");

module.exports.UpdateTeacher = async (req, res) => {
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
    });
}

