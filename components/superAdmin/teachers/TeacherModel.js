var mongoose = require("mongoose")
var teacherSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    cnic: {
        type: Number,
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    temporaryBlockStatus: {
        type: Boolean,
    },
    permanentBlockStatus: {
        type: Boolean,
    },
    fullControlStatus: {
        type: Boolean,
    },
})


var teacherObject = mongoose.model("teachers", teacherSchema);
module.exports = teacherObject;