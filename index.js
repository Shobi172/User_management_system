const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const port = 7000;
mongoose.connect("mongodb://127.0.0.1:27017/user_management_system")

const express = require("express");
const app = express();
app.use(cookieParser());

// for user routes

const userRoute = require('./routes/userRoute');
app.use('/',userRoute);


// for admin routes


const adminRoute = require('./routes/adminRoute');
app.use('/admin',adminRoute);

// app.use('/home',userRoute);

app.use((req,res,next)=>{
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
})


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});
