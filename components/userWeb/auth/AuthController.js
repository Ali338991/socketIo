
var StudentList = require("../../superAdmin/students/StudentModel")
var bycrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
const cloudinary = require("../../../config/Cloudinary")

module.exports.SignUp = async (req,res) =>{

 if (!req.body?.name) {
    res.status(400).json({ status: "error", message: "Name required", statusCode: 400 })
    return
  } else if (!req.body?.userName) {
    res.status(400).json({ status: "error", message: "User Name Required", statusCode: 400 })
    return
  } else if (!req.body?.email) {
    res.status(400).json({ status: "error", message: "Email Required", statusCode: 400 })
    return
  } else if (!req.body?.mobile) {
    res.status(400).json({ status: "error", message: "Mobile Number  Required", statusCode: 400 })
    return
  } else if (!req.body?.password){
    res.status(400).json({ status: "error", message: "Password  Required", statusCode: 400 })
    return
  } else if (!req.body?.confirmPassword){
    res.status(400).json({ status: "error", message: "Confirm Password  Required", statusCode: 400 })
    return
  }else  if (req.body?.password !== req.body?.confirmPassword) {
      res.status(400).json({ status: "error", message: "Password Not Matched", statusCode: 400 })
    return
  }else if (!req.file){
    res.status(400).json({ status: "error", message: "Photo  Required", statusCode: 400 })
    return
  }
  // user data validation end
  else {
    const check = await StudentList.findOne({ email: req.body?.email });
    if (check) {
      res.status(400).json({
        status: "success",
        message: "Email already exist",
        statusCode: 400,
      });
      return;
    }
    const filename =req.file?.path?await cloudinary.uploader.upload(req.file?.path,{ folder: "userWeb/signUp/" }):""
    const {name, userName, mobile,email,  password} = req.body;
    const encryptedPassword = await bycrypt.hash(password, 10);
    const newUser = new StudentList({
      name,
      userName,
      email,
      mobile,
      password: encryptedPassword,
      image: filename?.secure_url,
      cloudinaryId: filename?.public_id,
      status: "fullControl",
      role: "student",
    });
    newUser.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }else{
        
        
        console.log("body=> good", success);
        res.status(201).json({ status: "success", message: "Account Created Successfully", statusCode: 201 })
      }
      
    })
    
    
  }


}

// user login
module.exports.SignIn = async (req,res) =>{

if (!req.body?.email) {
    res.status(400).json({ status: "error", message: "Email required", statusCode: 400 })
    return
  } else if (!req.body?.password) {
    res.status(400).json({ status: "error", message: "Password Required", statusCode: 400 })
    return
  } else {
    const { email, password } = req.body;
    const user = await StudentList.findOne({email: email})
    if(! user){
      res.status(400).json({ status: "error", message: "Email not found", statusCode: 400 })
      return
    }else if (!await bycrypt.compare(password, user.password)) {
      res.status(400).json({ status: "error", message: "Your password is not correct", statusCode: 400 })
      return
    }
    var token = await jwt.sign(
      { email: user.email, name: user.name },
      process.env.jwtKey
    );
    
    let data = {
      id: user?._id,
      name: user?.name,
      userName: user?.userName,
      email: user?.email,
      mobile: user?.mobile,
      status: user?.status,
      cloudinaryId: user?.cloudinaryId,
      image: user?.image,
      role: user?.role,
      token,
    };

    res.status(202).json({ status: "success", message: "Admin Login successfully", data: data, statusCode: 202 })
    
  }
 

}
