const userModel = require("../models/userModel");
const hashPassword=require("../helpers/authHelper");
const jwt =require("jsonwebtoken");
const comparePassword = require("../helpers/authHelper");

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
        const existintuser=await userModel.findOne({email})
        if(existintuser){
            return res.status(200).send({
                success:true,
                message:"already registerd please login",

            })
        }
        const hashedPassword=await hashPassword(password)
        const user= await new userModel({name,email,phone,address,password:hashedPassword}).save()
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

  //login controller
  const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password',
            });
        }
        
        // Check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not found',
            });
        }

        const match = await comparePassword(password, user.password); // Assuming you have implemented comparePassword

        if (!match) {
            return res.status(401).send({
                success: false,
                message: 'Invalid password',
            });
        }

        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' });

        res.status(200).send({
            success: true,
            message: 'Login successful',
            user: {
                _id:user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error,
        });
    }
};
module.exports=loginController

const testController=(req,res)=>{
    res.send("protected route");
}
module.exports=testController