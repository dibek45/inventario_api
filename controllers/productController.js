const express=require('express');
const sql = require('seriate')
const _ =require('underscore')
var router=express.Router();

var dbConfig=require('../models/db');
sql.setDefaultConfig(dbConfig)

router.get('/',(req,res)=>{
    sql.connect(dbConfig).then(() => {
        return sql.query`select * from producto`
    }).then(result => {
        res.send(result);
        sql.close();
    }).catch(err => {
        // ... error checks
        sql.close();
    })
    sql.on('error', err => {
        // ... error handler
        sql.close();
    })
});

router.post('/',(req,res)=>{
    insert_data(req,res);
});

async function insert_data(req,res){
   console.log("Entra insert");
    var nombre=makeid();
    var imagen_normal=req.body.archivo;
    var imagen_mini=req.body.archivo_mini;
console.log("entra a evidencia");
    imagen_normal = imagen_normal.split(';base64,').pop();
    imagen_mini = imagen_mini.split(';base64,').pop();
        let ID =req.body.hallazoID;
       
        try {
            await insertar_registro_evidencia(req,res,nombre,ID,function(respuesta){
               console.log("Regresa Ejecucion",respuesta);
               fs.writeFile('C:/api node/antes/file_'+nombre+'.png', imagen_normal, {encoding: 'base64'}, function(err) {
                    console.log("con:FILE",err);
                    fs.writeFile('C:/api node/antes/mini_'+nombre+'.png', imagen_mini, {encoding: 'base64'}, function(err) {
                        console.log("con:MINI",err);
                        res.status(200).send(true);
                   });
               }); 
            });
        } catch(e) {
            console.log("error Evidencia",e); // 30
            res.status(500);
        }

}
  function insertar_registro_evidencia(req,res,nombre,ID,callback){
    let cmd = {
        query: `SP_insert_evidencia '${nombre}',${ID}`,
        params: {}
    }
    sql.execute(cmd).then( function( result ) {  
        console.log("bien");
    }, function( err ) {        
        callback(false)
        console.log("ERROR",JSON.stringify(err));
    } )    
  }



function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 46; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  
module.exports=router;