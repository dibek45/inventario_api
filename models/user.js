var SchemaObject = require('node-schema-object');
 var User = new SchemaObject({
   fullName: String,
   email: String,
   password: String,
   saltSecret: String
 });
  module.exports.User;