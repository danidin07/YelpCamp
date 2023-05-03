const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const {storeReturnTo} = require('../middleware');
const userC = require('../controllers/userController');

router.route('/register')
    .get(userC.showRegister)
    .post(catchAsync(userC.registerUser));

router.route('/login')
    .get(userC.showLogin)
    .post(storeReturnTo,passport.authenticate('local',{failureFlash:true, failureRedirect:'/login'}),userC.loginUser)

router.get('/logout',userC.logoutUser);

module.exports = router