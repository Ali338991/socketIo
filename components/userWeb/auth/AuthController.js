
var StudentList = require("../../superAdmin/students/StudentModel")
var bycrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
const cloudinary = require("../../../config/Cloudinary")
let { VerifyUser } = require("../../../utils/sendEmail");

module.exports.SignUp = async (req,res) =>{
try {
  if (!req.body?.name) {
    res
      .status(400)
      .json({ status: "error", message: "Name required", statusCode: 400 });
    return;
  } else if (!req.body?.userName) {
    res
      .status(400)
      .json({
        status: "error",
        message: "User Name Required",
        statusCode: 400,
      });
    return;
  } else if (!req.body?.email) {
    res
      .status(400)
      .json({ status: "error", message: "Email Required", statusCode: 400 });
    return;
  } else if (!req.body?.mobile) {
    res
      .status(400)
      .json({
        status: "error",
        message: "Mobile Number  Required",
        statusCode: 400,
      });
    return;
  } else if (!req.body?.password) {
    res
      .status(400)
      .json({
        status: "error",
        message: "Password  Required",
        statusCode: 400,
      });
    return;
  } else if (!req.body?.confirmPassword) {
    res
      .status(400)
      .json({
        status: "error",
        message: "Confirm Password  Required",
        statusCode: 400,
      });
    return;
  } else if (req.body?.password !== req.body?.confirmPassword) {
    res
      .status(400)
      .json({
        status: "error",
        message: "Password Not Matched",
        statusCode: 400,
      });
    return;
  } else if (!req.file) {
    res
      .status(400)
      .json({ status: "error", message: "Photo  Required", statusCode: 400 });
    return;
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
    const filename = req.file?.path
      ? await cloudinary.uploader.upload(req.file?.path, {
          folder: "userWeb/signUp/",
        })
      : "";

    const { name, userName, mobile, email, password } = req.body;
    const encryptedPassword = await bycrypt.hash(password, 10);
  

    let random = Math.floor(100000 + Math.random() * 900000);
    
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
      isVerify: false,
      code: random,
    });
    
    // email

    const verifyName = newUser?.name;
    const verifyEmail = newUser?.email;
    const verfiyCode = newUser?.code;
    const portal = process.env.AdminPortal;
    await VerifyUser(verifyName, verifyEmail,verfiyCode , portal, res);

    newUser.save((err, success) => {
      if (err) {
        res
          .status(400)
          .json({ status: "error", message: err?.message, statusCode: 400 });
        return;
      } else {
        
        res
          .status(201)
          .json({
            status: "success",
            message: "Account Created Successfully",
            statusCode: 201,
          });
      }
    });
  }
} catch (error) {
  res
    .status(400)
    .json({ status: "error", message: error?.message, statusCode: 400 });
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
    const user = await StudentList.findOne({email: email}).populate('enrolledCourse','courseName')
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
      enrolledCourse:user?.enrolledCourse,
      token,
    };

    res.status(202).json({ status: "success", message: "Admin Login successfully", data: data, statusCode: 202 })
    
  }
 

}


module.exports.ForgotPassword = async (req,res) =>{
if (!req.body?.email) {
    res.status(400).json({ status: "error", message: "Email required", statusCode: 400 })
    return
  } else if (!req.body?.password){
    res.status(400).json({ status: "error", message: "New  Password  Required", statusCode: 400 })
    return
  } else {
    const { email, password } = req.body;
    const user = await StudentList.find({ email: email });
    if (!user) {
      res
        .status(400)
        .json({ status: "error", message: "Email not found", statusCode: 400 });
      return;
    }
    const encryptedPassword = await bycrypt.hash(password, 10);
 
     await StudentList.findOneAndUpdate({ email: email }, {password: encryptedPassword});
     res.status(201).json({ status: "success", message: "Password Updated Successfully", statusCode: 201 })
  }

}
// verify signup user
module.exports.VerifySignupUser = async (req,res) =>{
  console.log("verify");
if (!req.body?.email) {
    res.status(400).json({ status: "error", message: "Email required", statusCode: 400 })
    return
  } else if (!req.body?.code){
    res.status(400).json({ status: "error", message: "Code Required", statusCode: 400 })
    return
  } else {
    const { email, code } = req.body;
    const userEmail = await StudentList.find({ email: email });
    const userCode = await StudentList.find({ code: code });

    if (userEmail == "") {
      res
        .status(400)
        .json({
          status: "error",
          message: "Enter Valid Email ",
          statusCode: 400,
        });
      return;
    } else if (userCode == "") {
      res
        .status(400)
        .json({
          status: "error",
          message: "Enter Valid Code",
          statusCode: 400,
        });
      return;
    } else {
        await StudentList.findOneAndUpdate({email: email}, {isVerify : true}, )
        await StudentList.findOneAndUpdate({email: email}, {$unset: {code: code}})

        res.status(201).json({ status: "success",  message: "User Verfication Successfully", statusCode: 201 })
    }
     
  }

}




