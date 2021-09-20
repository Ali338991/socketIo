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
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
        validator: function(v) {
        return /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
        },
        required: [true, "Email required"]
        },
    image: {
        type: String,
    },
    cnic: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    status:{
        type: String,
          required:true
      },
      cloudinaryId:{
        type: String,
      }
})


var teacherObject = mongoose.model("teachers", teacherSchema);
module.exports = teacherObject;