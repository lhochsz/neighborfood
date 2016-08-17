var express = require('express');
var router = express.Router();
var WishlistItem = require('../models/wishlist');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// INDEX
router.get('/', function(req, res, next) {
  // get all the wishlist items and render the index view
  WishlistItem.find({})
  .then(function(wishlistItems) {
    res.render('wishlist/index', { wishlistItems: wishlistItems } );
  }, function(err) {
    return next(err);
  });
});

// NEW
router.get('/new', function(req, res, next) {
  var wishlistItem = {
    food: '',
    amount: ''
  };
  res.render('wishlist/new', { wishlistItem: wishlistItem } );
});

// CREATE
router.post('/', function(req, res, next) {
  console.log('req.body:', req.body);
  var wishlistItem = new WishlistItem({
    food: req.body.food,
    amount: req.body.amount
  });
  wishlistItem.save()
  .then(function(saved) {
    res.redirect('/wishlist');
  }, function(err) {
    return next(err);
  });
});

//SHOW
router.get('/:id', function(req, res, next) {
  WishlistItem.findById(req.params.id)
  .then(function(wishlistItem) {
    if (!wishlistItem) return next(makeError(res, 'Document not found', 404));
    res.render('wishlist/show', { wishlistItem: wishlistItem });
  }, function(err) {
    return next(err);
  });
});

// EDIT
router.get('/:id/edit', function(req, res, next) {
  WishlistItem.findById(req.params.id)
  .then(function(wishlistItem) {
    if (!wishlistItem) return next(makeError(res, 'Document not found', 404));
    res.render('wishlist/edit', { wishlistItem: wishlistItem });
  }, function(err) {
    return next(err);
  });
});

// UPDATE
router.put('/:id', function(req, res, next) {
  WishlistItem.findById(req.params.id)
  .then(function(wishlistItem) {
    if (!wishlistItem) return next(makeError(res, 'Document not found', 404));
    wishlistItem.title = req.body.food;
    wishlistItem.amount = req.body.amount;
    return wishlistItem.save();
  })
  .then(function(saved) {
    res.redirect('/wishlist');
  }, function(err) {
    return next(err);
  });
});

// DESTROY
router.delete('/:id', function(req, res, next) {
  WishlistItem.findByIdAndRemove(req.params.id)
  .then(function() {
    res.redirect('/wishlist');
  }, function(err) {
    return next(err);
  });
});


module.exports = router;
