const User = require('../models/usermodel');
const bcrypt = require('bcrypt');

const securePassword = async(password)=>{

    try {

      const passwordHash = await bcrypt.hash(password, 10);
      return passwordHash;
        
    } catch (error) {

        console.log(error.message);
        
    }
}

// User Register


const loadRegister = async(req,res)=>{

    try {

        res.render('register');
        

    } catch (error) {

        console.log(error.message);
        
    }
}


const insertUser = async(req,res)=>{

    try {

        const spassword = await securePassword(req.body.password);

        const user = new User({

            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            password:spassword,
            confirmpassword:spassword,
            is_admin:0,
        });


        const userData = await user.save();

        if (userData) {
            res.render('register',{message:"Registration successfull"});
            
        }
        else{
            res.render('register',{message:"Registration failed"});
        }
        

    } catch (error) {

        console.log(error.message);
        
    }
}



// user login methods

const loginLoad = async(req,res)=>{

    try{

        if (req.session.user_id) {

            res.redirect('/home');    
        }
        else{
            res.render('login');
        }

        



    }catch(error){
        console.log(error.message);
    }
}

// verify user login


const verifyLogin = async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;


      const userData = await User.findOne({email:email});
    
    

      if (userData) {

        const passwordMatch = await bcrypt.compare (password,userData.password)

        if(passwordMatch) { 


            req.session.user_id = userData._id;
            res.redirect('/home');
            console.log(req.session.user_id);


            // if(userData.is_varified === 0){
            //     res.render('login',{message:"Please verify mail"});
            // }
            // else{
            //     req.session.user_id = userData._id;
            //     res.redirect('/home');
            // }

        }
            else{

                res.redirect('/',{message:"Invalid login detials"});
                

            }

    }
    else{

        res.render('login',{message:"Invalid login detials"});

    }
}

    catch(error){
        console.log(error.message);
    }
}
    



// Home page


const loadHome = async(req,res)=>{
    try{


        if (req.session.user_id) {

            res.render('home');    
        }
        else{
            res.redirect('/');
        }

        
     
    }
    catch(error){

        console.log(error.message);

    }
}

// logout


const userLogout = async(req,res)=>{
    try {

        req.session.destroy();
        res.redirect('/');
        
    } catch (error) {
        console.log(error.message);
        
    }
}


module.exports = {

    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout
}