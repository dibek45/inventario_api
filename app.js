require('./models/db');
require('./config/config');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const rtsIndex=require('./routes/index.router');
var app=express();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cors({ origin: '*' }));
app.use('/api',rtsIndex);

//start server
app.listen(process.env.PORT,"0.0.0.0",()=>{
    console.log(`Express server started at port :${process.env.PORT}`);
})