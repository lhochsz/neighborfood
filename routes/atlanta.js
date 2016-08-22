var express = require('express');
var router = express.Router();
var FridgeItem = require('../models/fridge');
var FridgeItem = require('../models/user');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// Neighborhood
router.get('/atlanta', authenticate, function(req, res, next) {
  // get all the fridge items and render the index view
  var fridgeItems = global.currentUser.fridgeItems;
  res.render('fridge/atlanta', {});
});

// // INDEX
// router.get('/atlanta', authenticate, function(req, res, next) {
//   // get all the global fridge items and render the index view
//   FridgeItem.find({})
//   .then(function(fridgeItems) {
//     res.render('fridge/atlanta', { fridgeItems: fridgeItems, message: req.flash() });
//   }, function(err) {
//     return next(err);
//   });
// });


module.exports = router;
