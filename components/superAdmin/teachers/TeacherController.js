var teacherObject = require("./TeacherModel");
let { AddTeacher } = require('./teacherControllerFunctions/AddTeacher');
let { GetTeachers } = require('./teacherControllerFunctions/GetTeachers');
let{TemporaryBlock}=require('./teacherControllerFunctions/TemporaryBlock');
let{PermanentBlock}=require('./teacherControllerFunctions/PermanentBlock');
let{FullControl}=require('./teacherControllerFunctions/FullControl');
let{UpdateTeacher}=require('./teacherControllerFunctions/UpdateTeacher');
let{DeleteTeacher}=require('./teacherControllerFunctions/DeleteTeacher');
module.exports.addTeacher = (req, res) => {
  AddTeacher(req, res);
};

module.exports.getTeachers = (req, res) => {
  GetTeachers(req, res)
};

module.exports.temporaryBlock =(req, res) => {
  TemporaryBlock(req,res)
};

module.exports.permanentBlock = async (req, res) => {
  PermanentBlock(req,res)
};

module.exports.fullControl = async (req, res) => {
  FullControl(req,res)
};

module.exports.updateTeacher = async (req, res) => {
  UpdateTeacher(req,res)
};

module.exports.deleteTeacher = async (req, res) => {
  DeleteTeacher(req,res)
};
