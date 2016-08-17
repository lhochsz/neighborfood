var express = require('express');
var router = express.Router();
var FridgeItem = require('../models/fridge');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// INDEX
router.get('/', function(req, res, next) {
  // get all the fridge items and render the index view
  FridgeItem.find({})
  .then(function(fridgeItems) {
    res.render('fridge/index', { fridgeItems: fridgeItems } );
  }, function(err) {
    return next(err);
  });
});

// NEW
router.get('/new', function(req, res, next) {
  var fridgeItem = {
    food: '',
    amount: ''
  };
  res.render('fridge/new', { fridgeItem: fridgeItem } );
});

// CREATE
router.post('/', function(req, res, next) {
  console.log('req.body:', req.body);
  var fridgeItem = new FridgeItem({
    food: req.body.food,
    amount: req.body.amount
  });
  fridgeItem.save()
  .then(function(saved) {
    res.redirect('/fridge');
  }, function(err) {
    return next(err);
  });
});

//SHOW
router.get('/:id', function(req, res, next) {
  FridgeItem.findById(req.params.id)
  .then(function(fridgeItem) {
    if (!fridgeItem) return next(makeError(res, 'Document not found', 404));
    res.render('fridge/show', { fridgeItem: fridgeItem });
  }, function(err) {
    return next(err);
  });
});

// EDIT
router.get('/:id/edit', function(req, res, next) {
  FridgeItem.findById(req.params.id)
  .then(function(fridgeItem) {
    if (!fridgeItem) return next(makeError(res, 'Document not found', 404));
    res.render('fridge/edit', { fridgeItem: fridgeItem });
  }, function(err) {
    return next(err);
  });
});

// UPDATE
router.put('/:id', function(req, res, next) {
  FridgeItem.findById(req.params.id)
  .then(function(fridgeItem) {
    if (!fridgeItem) return next(makeError(res, 'Document not found', 404));
    fridgeItem.title = req.body.food;
    fridgeItem.amount = req.body.amount;
    return fridgeItem.save();
  })
  .then(function(saved) {
    res.redirect('/fridge');
  }, function(err) {
    return next(err);
  });
});

// DESTROY
router.delete('/:id', function(req, res, next) {
  FridgeItem.findByIdAndRemove(req.params.id)
  .then(function() {
    res.redirect('/fridge');
  }, function(err) {
    return next(err);
  });
});


module.exports = router;

