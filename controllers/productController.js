const passport=require('passport');
const sql = require('seriate');
var dbConfig=require('../models/db');
var producto=require('../models/product');
const _=require('lodash');

sql.setDefaultConfig(dbConfig);

 module.exports.insert=(req,res,next)=>{
//insert values todavia no funciona
  /*       let User = new producto.Model({fullName:req.body.fullName,email:req.body.email,password:req.body.password,saltSecret:req.body.saltSecret})
         user.add_salt(User).then(User => {
         user.insert_registro(User).then(result => {
            if(result[0].status==402)return res.status(402).json(result[0].status);
            return res.status(200).json(result[0].status);
         });
      });*/
   
}



 module.exports.getAll=(req,res)=>{
   producto.find_All().then( function( products ) {  
      if (!products) {
         return res.status(404).json({status:false,message:'User record not found'})
      }
      else {
      return res.status(200).json({status:true,user:("Usuarios",products)})
      }
  }, function( err ) {        
      console.log("ERROR este",JSON.stringify(err));
  } )
 }

