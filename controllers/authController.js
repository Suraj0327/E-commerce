const userModel = require("../models/userModel");

const registerController = async(req,res) => {
    try{
        const {name,email,password,phone,address}=req.body
        if(!name){
            return res.send({error:"name is required"})
        }
        if(!email){
            return res.send({error:"email is required"})
        }
        if(!password){
            return res.send({error:"password is required"})
        }
        if(!phone){
            return res.send({error:"phone is required"})
        }
        if(!address){
            return res.send({error:"address is required"})
        }
        const existintuser=await userModel.findOne({emial})
        if(existintuser){
            return res.status(200).send({
                success:true,
                message:"already registerd please login",

            })
        }
        const hashedPassword=await hashPassword(password)
        const user=new userModel({name,email,phone,address,password:hashedPassword}).save()
        res.status(201).send({
            success:true,
            message:"user registed successfully",
            user
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in registration",
            error
        })
    }
    // Your controller logic here
  };
  
  module.exports = registerController;
  