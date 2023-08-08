const express=require('express');
const registerController=require('../controllers/authController');
const loginController = require('../controllers/authController');
const testController = require('../controllers/authController');
const isAdmin = require('../middlewares/authMiddleware');
const reqSignin=require('../middlewares/authMiddleware')
const router=express.Router()
//registration post
router.post('/register',registerController);
router.post('/login',loginController);
router.get('/test',reqSignin,isAdmin, testController);
module.exports=router;
//login post 