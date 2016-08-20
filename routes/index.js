var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user')
var FridgeItem = require('../models/fridge');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "NeighborFood", message: req.flash() });
});

// GET /signup
router.get('/signup', function(req, res, next) {
  res.render('signup.ejs', { message: req.flash() });
});

// POST /signup
router.post('/signup', function(req, res, next) {
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
  });

  return signUpStrategy(req, res, next);
});

// GET /login
router.get('/login', function(req, res, next) {
  res.render('login.ejs', { message: req.flash() });
});

// POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
  });

  return loginProperty(req, res, next);
});

// Neighborhood INDEX

router.get('/atlanta', function(req, res, next) {
    FridgeItem.find({})
    .then(function(fridgeItems) {
    console.log(fridgeItems);
    res.render('fridge/atlanta', { fridgeItems: fridgeItems });
  }, function(err) {
    return next(err);
  });
});

// // // Neighborhood SHOW
// router.get('/:id', function(req, res, next) {
//   FridgeItem.findById(req.params.id)
//   .then(function(fridgeItem) {
//     if (!fridgeItem) return next(makeError(res, 'Document not found', 404));
//     res.render('fridge/neighboritem', { fridgeItem: fridgeItem } );
//   }, function(err) {
//     return next(err);
//   });
// });

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;


