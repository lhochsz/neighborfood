var express = require('express');
var router = express.Router();

var FridgeItem = require('../models/fridge');
var User = require('../models/user');
var neighborhoods = require('../data/neighborhoods');


function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Not allowed');
    res.redirect('/');
  }
  else {
    next();
  }
}

// INDEX
router.get('/', authenticate, function(req, res, next) {
  // get all the fridge items and render the index view
  var fridgeItems = global.currentUser.fridgeItems;
  res.render('fridge/index', { fridgeItems: fridgeItems, message: req.flash() });
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
  var fridgeItem = {
    food: '',
    amount: '',
    neighborhood: '',
    meetingLocation: ''
  };
  res.render('fridge/new', { fridgeItem: fridgeItem,
                             neighborhoods: neighborhoods,
                             message: req.flash() });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  FridgeItem.findById(req.params.id)
  .then(function(fridgeItem) {
    if (!fridgeItem) return next(makeError(res, 'Document not found', 404));
    res.render('fridge/show', { fridgeItem: fridgeItem, message: req.flash() } );
  }, function(err) {
    return next(err);
  });
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  FridgeItem.create({
    food:     req.body.food.toLowerCase(),
    amount: req.body.amount,
    neighborhood: req.body.neighborhood,
    meetingLocation: req.body.meetingLocation,
    owner: currentUser._id
  })
  .then(function(item) {
    currentUser.fridgeItems.push(item);
    return currentUser.save();
  })
  .then(function() {
    res.redirect('/fridge');
  }, function(err) {
    return next(err);
  });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  FridgeItem.findById(req.params.id)
  .then(function(fridgeItem) {
    if (!fridgeItem) return next(makeError(res, 'Document not found', 404));
    res.render('fridge/edit', { fridgeItem: fridgeItem,
                                neighborhoods: neighborhoods,
                                message: req.flash() } );
  }, function(err) {
    return next(err);
  });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  FridgeItem.findById(req.params.id)
  .then(function(fridgeItem) {
    if (!fridgeItem) return next(makeError(res, 'Document not found', 404));
    else {
      fridgeItem.food = req.body.food;
      fridgeItem.amount = req.body.amount;
      fridgeItem.neighborhood = req.body.neighborhood;
      fridgeItem.meetingLocation = req.body.meetingLocation;
      return fridgeItem.save()
    }
  })
  .then(function(saved) {
    res.redirect('/fridge');
  }, function(err) {
    return next(err);
  });
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  FridgeItem.findById(req.params.id)
  .then(function(fridgeItem) {
    if (!fridgeItem) return next(makeError(res, 'Document not found', 404));
    var index = currentUser.fridgeItems.indexOf(fridgeItem);
    currentUser.fridgeItems.splice(index, 0);
    return currentUser.save();
  })
  .then(function(saved) {
    return FridgeItem.findByIdAndRemove(req.params.id);
  })
  .then(function(removed) {
    res.redirect('/fridge');
  }, function(err) {
    return next(err);
  });
});

module.exports = router;

