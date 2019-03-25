require('./models/db');
require('./config/config');
require('./config/passport_config');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
var app=express();

const rtsIndex=require('./routes/index.router');

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cors({ origin: '*' }));
app.use(passport.initialize());
app.use('/api',rtsIndex);

//start server
app.listen(process.env.PORT,"0.0.0.0",()=>{
    console.log(`Express server started at port :${process.env.PORT}`);
})