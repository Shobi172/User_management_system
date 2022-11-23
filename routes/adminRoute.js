const express = require("express");
const admin_route = express();
const session = require("express-session");
const config = require("../config/config");

admin_route.use(session({
    secret:config.sessionSecret,
    resave:false,
    saveUninitialized: true,
    cookie:{maxAge:600000}
  }));


admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin')

const auth = require('../middleware/adminAuth');


const bodyParser = require('body-parser');
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({extended:true}))


const admincontroller = require("../controllers/admincontroller");

admin_route.get('/', admincontroller.loadLogin);

admin_route.post('/',admincontroller.verifyLogin);

admin_route.get('/home',auth.isLogin, admincontroller.loadDashboard);

admin_route.get('/logout',auth.isLogin, admincontroller.logout);

admin_route.get('/dashboard',auth.isLogin,admincontroller.adminDashboard);

admin_route.get('/new-user',admincontroller.newUserLoad);

admin_route.post('/new-user',admincontroller.addUser);

admin_route.get('/edit-user',admincontroller.editUserLoad);

admin_route.post('/edit-user',admincontroller.updateUsers);

admin_route.get('/delete-user',admincontroller.deleteUser);



admin_route.get('*',function(req,res){

    res.redirect('/admin');

})




module.exports = admin_route;
