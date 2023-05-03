const User = require('../models/user');

module.exports.showRegister =(req,res) =>{
    res.render('users/register');
};
module.exports.registerUser = async(req,res,next) =>{
    try{
        const {email,username,password} = req.body;
    const user = new User({
        email:email,
        username:username
    });
   const registeredUser = await User.register(user,password);
   req.login(registeredUser,err =>{
     if(err) return next(err);
     req.flash('success','Welcome to Yelp Camp')
   res.redirect('/campgrounds');
   })
   
    }
    catch (e) {
        req.flash('error',e.message);
        res.redirect('register')
    }
};
module.exports.showLogin = (req,res) =>{
    res.render('users/login')
};
module.exports.loginUser = (req,res) =>{
    
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    req.flash('success','Welcome back')
    if(redirectUrl.includes("DELETE")){
      const campgroundId = redirectUrl.match(/\/campgrounds\/(\w+)/)[1];
      return res.redirect(`/campgrounds/${campgroundId}`);
     } 
     
    res.redirect(redirectUrl);
};
module.exports.logoutUser =  (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error(err);
      }
      req.flash('success', 'You have been logged out.');
      res.redirect('/campgrounds');
    });
  }; 