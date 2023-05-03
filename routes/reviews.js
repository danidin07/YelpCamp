const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review');
const Campground = require('../models/campground');
const {validateReview,isLoggedIn,isReviewAuthor} = require('../middleware');
const reviewC = require('../controllers/reveiwController');



router.post('/',isLoggedIn,validateReview,catchAsync(reviewC.postReview));

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviewC.deleteReview));

module.exports = router;