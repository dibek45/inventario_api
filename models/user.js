var SchemaObject = require('node-schema-object');
const sql = require('seriate');
var dbConfig=require('../models/db');
const bcypt=require('bcrypt');
const jwt=require('jsonwebtoken');

sql.setDefaultConfig(dbConfig);
var User ={}

User.Model= new SchemaObject({
   fullName: String,
   email: String,
   password: String,
   saltSecret: String
});



 User.insert_registro=(user)=>{
    return new Promise((resolve, reject) => {
          let cmd = {query: `EXEC SP_insert_user '${user.fullName}','${user.email}','${user.password}','${user.saltSecret}'`}
          sql.execute(cmd).then( function( result ) {  
                 resolve(JSON.stringify(result)); // ¡Todo salió bien!
          }, function( err ) {        
            reject(err)
          } )
      });
}

User.find_one=(email)=>{
  return new Promise((resolve, reject) => {
        let cmd = {query: `EXEC SP_find_by_email '${email}'`}
        sql.execute(cmd).then( function( result ) {  
               resolve(result[0]); // ¡Todo salió bien!
        }, function( err ) {        
               reject(err)
        } )
    });
}

User.find_id=(id)=>{
  return new Promise((resolve, reject) => {
        let cmd = {query: `EXEC SP_find_by_id ${id}`}
        sql.execute(cmd).then( function( result ) {  
               resolve(result[0]); // ¡Todo salió bien!
        }, function( err ) {        
               reject(err)
        } )
    });
}


User.add_salt=(user)=>{

  return new Promise((resolve, reject) => {
    bcypt.genSalt(10,(err,salt)=>{
      bcypt.hash(user.password,salt,(err,hash)=>{
         user.password=hash;
         user.saltSecret=salt;
         resolve(user); // ¡Todo salió bien!
      });
   })
  });
}

User.compare_password=(custom_pass,db_pass)=>{

  return new Promise((resolve, reject) => {
    var exitUser=bcypt.compareSync(`${custom_pass}`,`${db_pass}`);
     resolve(exitUser);
   })
  
}

User.generateJwt=function(userID){

  return new Promise((resolve,reject)=>{
    resolve(jwt.sign({"_id":userID},
                      process.env.JWT_SECRET,
                      {
                      expiresIn:process.env.JWT_EXP
                      }
                      ));
  })
 
}

  module.exports=User; 