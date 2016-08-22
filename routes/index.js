var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user')
var FridgeItem = require('../models/fridge');
var neighborhoods = require('../data/neighborhoods');


function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Not allowed');
    res.redirect('/');
  }
  else {
    next();
  }
}

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

router.get('/atlanta', authenticate, function(req, res, next) {
    console.log('req.query:', req.query);
    var searchOptions = {};
    if (req.query.neighborhood) {
      searchOptions.neighborhood = req.query.neighborhood;
    }
    if (req.query.food) {
      searchOptions.food = req.query.food;
    }

    FridgeItem.find(searchOptions)
    .then(function(fridgeItems) {
    console.log('fridgeItems:', fridgeItems);
    res.render('fridge/atlanta', { fridgeItems: fridgeItems,
                                   searchOptions: searchOptions,
                                   neighborhoods: neighborhoods });
  }, function(err) {
    return next(err);
  });
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;


