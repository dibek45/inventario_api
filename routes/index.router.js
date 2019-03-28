const express=require('express');
const router=express.Router();
const jwtHelper=require('../config/jwtHelper')

//Users
const ctrlUser=require('../controllers/userController');
router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

//Products
const ctrlProduct=require('../controllers/productController');
router.get('/products',ctrlProduct.getAll);

module.exports=router;