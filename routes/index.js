var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user')
var FridgeItem = require('../models/fridge');
var neighborhoods = require('../data/neighborhoods');

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

// Neighborhood Search
// router.post('/atlanta', authenticate, function(req, res, next) {
//   var currentUser = req.user;
//   var keywords = [req.body.keywords];
//   var neighborhood = req.body.neighborhood;
//   if (food.length > 0) {
//   db.find.({food: food})
//   .Radius(radius)
//   .WhereKeywords(keywords)
//   .WhereLocation({
//     city: city,
//     state: state
//   })
//   .Limit(limit)
//   .SortBy("date")
//     .Search(function (results) {
//     res.render('atlanta/search', { jobs: results.results, message: req.flash() });
//     // console.log(results.results[0].jobkey);
//   },
//     function (error) {

//     console.log(error);
//   });
//   }
//   else {
//   api.JobSearch()
//   .Radius(radius)
//   .WhereLocation({
//     city: city,
//     state: state
//   })
//   .Limit(limit)
//   .SortBy("date")
//   .UserIP("1.2.3.4")
//   .UserAgent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36")
//   .Search(function (results) {
//     res.render('jobs/search', { jobs: results.results, message: req.flash() });
//     // console.log(results.results[0].jobkey);
//   },
//     function (error) {

//     console.log(error);
//   });
//   };
// });

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;


