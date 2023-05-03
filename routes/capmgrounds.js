const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {isLoggedIn,validateCampground,isAuthor} = require('../middleware');
const campgroundC = require("../controllers/campgroundController");
const {storage} = require('../cloudinary');
const multer = require('multer');
const upload = multer({storage});

router.route('/')
    .get(catchAsync(campgroundC.index))
    .post(isLoggedIn,upload.array('image'), validateCampground, catchAsync(campgroundC.createCampground))
    


router.get('/new',isLoggedIn,campgroundC.showNew);


router.route('/:id')
    .get(catchAsync(campgroundC.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgroundC.updateCampground))
    .delete(isLoggedIn,isAuthor,catchAsync(campgroundC.deleteCampground));
    
router.get('/:id/edit',isLoggedIn,isAuthor, catchAsync(campgroundC.showUpdate));





module.exports = router;