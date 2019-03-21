const bcypt=require('bcrypt');
const sql = require('seriate');
var dbConfig=require('../models/db');
sql.setDefaultConfig(dbConfig);

module.exports.register=(req,res,next)=>{
   insert_user(req,res);
}

//insertar user
async function insert_user(req,res){
   password='';
   salt='';
   user = new User({fullName:req.body.fullName,email:req.body.email,password:req.body.password,saltSecret:req.body.saltSecret})
   pre_user_schema(user,res);
}

//salt 
function pre_user_schema(user,res){
   bcypt.genSalt(10,(err,salt)=>{
      bcypt.hash(user.password,salt,(err,hash)=>{
         user.password=hash;
         user.saltSecret=salt;
         insert_registro(user,res);
      })
   })
}

   function insert_registro(user,res){
      let cmd = {
         query: `EXEC SP_insert_user '${user.fullName}','${user.email}','${user.password}','${user.saltSecret}'`
     }
      sql.execute(cmd).then( function( result ) {  
   
            res.status(result[0].status).send([result[0].result]);
     }, function( err ) {        
         console.log("ERROR este",JSON.stringify(err));
     } ) 
   }


//model
var SchemaObject = require('node-schema-object');
 var User = new SchemaObject({
   fullName: String,
   email: String,
   password: String,
   saltSecret: String
 });