const express=require('express');
const router=express.Router();

const ctrlProd=require('../controllers/userController');
router.post('/register',ctrlProd.register);

module.exports=router;