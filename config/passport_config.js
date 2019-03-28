const passport=require('passport');
const localStartegy=require('passport-local').Strategy;
const sql = require('seriate');
const bcypt=require('bcrypt');
var user=require('../models/user');

passport.use(
     new localStartegy({usernameField:'email'},
     (username,password,done)=>{
      
        user.find_one(username).then( function( result ) {  
            
            if (result.result=='No existe usuario') {
                return done(null,false,{"message":'Usuario no esta registrado'})
                }
            else{
                 user.compare_password(`${password}`,`${result.password}`).then((boolean)=>{
                    if(boolean)
                    return done(null,result,{"message":'Usuario correcto'});
            else
                return done(null,false,{"message":'Contraseña incorrecta'})      
                    });
                }
         
        }, function(err) {        
            console.log("ERROR este",JSON.stringify(err));
        } )
     })
);
    

