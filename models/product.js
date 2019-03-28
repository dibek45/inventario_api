var SchemaObject = require('node-schema-object');
const sql = require('seriate');
var dbConfig=require('./db');

sql.setDefaultConfig(dbConfig);
var Product ={}

Product.Model= new SchemaObject({
   productoID: String,
   descripcion: String,
   unidad_despacho: String,
   balance_actual: Number,
   cantidad_disponible: Number
});


/*
 product.insert_registro=(user)=>{
    return new Promise((resolve, reject) => {
          let cmd = {query: `EXEC SP_insert_product '${user.fullName}','${user.email}','${user.password}','${user.saltSecret}'`}
          sql.execute(cmd).then( function( result ) {  
                 resolve(JSON.stringify(result)); // ¡Todo salió bien!
          }, function( err ) {        
            reject(err)
          } )
      });
}
*/

Product.find_All=()=>{
  return new Promise((resolve, reject) => {
        let cmd = {query: `EXEC SP_product_all`}
        sql.execute(cmd).then( function( result ) {  
               resolve(result); // ¡Todo salió bien!
        }, function( err ) {        
               reject(err)
        } )
    });
}

Product.find_id=(productoID)=>{
  return new Promise((resolve, reject) => {
        let cmd = {query: `EXEC SP_product_findOne ${productoID}`}
        sql.execute(cmd).then( function( result ) {  
               resolve(result[0]); // ¡Todo salió bien!
        }, function( err ) {        
               reject(err)
        } )
    });
}



  module.exports=Product; 