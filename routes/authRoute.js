const express=require('express');
const registerController=require('../controllers/authController');
const loginController = require('../controllers/authController');
const router=express.Router()
//registration post
router.post('/register',registerController);
router.post('/login',loginController)
module.exports=router;
//login post