const express = require("express");
const user_route = express();
const session = require("express-session");
const config = require("../config/config");
// const cookieparser = require("cookie-parser");



user_route.use(session({
    secret:config.sessionSecret,
    resave:false,
    saveUninitialized: true,
    // cookie:{maxAge:60000}
  }));

  const auth = require("../middleware/auth");
  // user_route.use(cookieparser());





user_route.set('view engine','ejs');
user_route.set('views','./views/users')

const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}))

const usercontroller = require("../controllers/usercontroller");

user_route.get('/register',auth.isLogout, usercontroller.loadRegister);

user_route.post('/register',usercontroller.insertUser);

user_route.get('/',auth.isLogout, usercontroller.loginLoad);

user_route.get('/login',auth.isLogout, usercontroller.loginLoad);


user_route.post('/login',usercontroller.verifyLogin);

user_route.get('/home',auth.isLogin, usercontroller.loadHome);

user_route.get('/logout',auth.isLogin,usercontroller.userLogout);






module.exports = user_route;  