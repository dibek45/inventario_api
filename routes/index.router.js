const express=require('express');
const router=express.Router();
const jwtHelper=require('../config/jwtHelper')

const ctrlUser=require('../controllers/userController');
router.post('/register',ctrlUser.register);
router.post('/autenticate',ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports=router;