var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Job = require('../models/fridge');

var authenticate = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
}

//SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var currentUser = req.user;
  // User.findById(req.params.id)
  if (!currentUser) return next(makeError(res, 'Document not found', 404));
  res.render('./users/show', { user: currentUser, message: req.flash() } );
  }, function(err) {
    return next(err);
  ;
});

//EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  var currentUser = req.user;
  if (!currentUser) return next(makeError(res, 'Document not found', 404));
  var checked = currentUser.completed ? 'checked' : '';
  res.render('users/edit', { user: currentUser, checked: checked, message: req.flash() } );
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  var currentUser = req.user;
  if (!currentUser) return next(makeError(res, 'Document not found', 404));
  else {
    currentUser.firstName = req.body.firstName;
    currentUser.lastName = req.body.lastName;
    console.log('about to save currentUser:', currentUser);
    currentUser.save()
    .then(function(saved) {
      res.redirect('/users/' + saved._id);
    }, function(err) {
      return next(err);
    });
  };
});

module.exports = router;
