
const bcypt=require('bcrypt');
const passport=require('passport');
const sql = require('seriate');
var dbConfig=require('../models/db');
var user=require('../models/user');
const _=require('lodash');


sql.setDefaultConfig(dbConfig);

 module.exports.register=(req,res,next)=>{

      let User = new user.Model({fullName:req.body.fullName,email:req.body.email,password:req.body.password,saltSecret:req.body.saltSecret})
       user.add_salt(User).then(User => {
         user.insert_registro(User).then(resultadoFinal => {
            if(resultadoFinal[0].status==402)return res.status(402).json(resultadoFinal[0].status);
            return res.status(200).json(resultadoFinal[0].status);
         });
      });
   
}


module.exports.authenticate=(req,res)=>{
   
    passport.authenticate('local',(err,User,info)=>{   
      console.log('entra 2');    
       if(err){
          console.log(err)
          return res.status(400).json(err);
         }
       else if(User){
          user.generateJwt(User.userID).then((result)=>{
            return res.status(200).json({"token":result})
          })
       }
       else if(!User){
          console.log('No hay un usuario');
          return res.status(200).json({info})
       }
       else return res.status(404).json(info);
    })(req,res); 
 }

 module.exports.userProfile=(req,res)=>{
   user.find_id(req._id).then( function( user ) {  
      if (!user) {
         return res.status(404).json({status:false,message:'User record not found'})
      }
      else 
      return res.status(200).json({status:true,user:_.pick(user,['fullName','email'])})
  }, function( err ) {        
      console.log("ERROR este",JSON.stringify(err));
  } )
 }

