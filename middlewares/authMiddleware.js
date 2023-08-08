// const jwt=require('jsonwebtoken');
// const userModel = require('../models/userModel');
// //protected route token base
// const reqSignin=async(req,res,next)=>{
// try{
//     const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    
// req.user=decode;

//     next();
// }catch(error){
//     console.log(error);
// }
    
// }
// module.exports=reqSignin

// //admin access
// const isAdmin=async(req,res,next)=>{
// try{
//     const user = await userModel.findById(req.user._id);

//     console.log(user);
//     if(user.role!==1){
//         return res.status(401).send({
//             success:false,
//             message:"unauthorized access"
//         })
//     }else{
//         next();
//     }
// }catch(error){
//     console.log(error)
//     res.status(401).send({
//         success:false,
//         error,
//         message:"error in admin middleware"
//     })
// }
// }
// module.exports=isAdmin

const JWT =require("jsonwebtoken");
const userModel=require("../models/userModel")

//Protected Routes token base
 const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
    //   req.user = decode;
    //   console.log(req.user)
      

    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports=requireSignIn

//admin acceess
 const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById("64d08db7b0663695adc477cb");

    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
module.exports=isAdmin