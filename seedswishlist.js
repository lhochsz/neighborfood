var mongoose = require('mongoose');
var WishlistItem = require('./models/wishlist');
mongoose.Promise = require('bluebird')

mongoose.connect('mongodb://localhost/wishlist');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('removing old wishlist items...');
WishlistItem.remove({})
.then(function() {
  console.log('old wishlist items removed');
  console.log('creating some wishlist items...');
  var ketchup  = new WishlistItem ({ food: 'ketchup',  amount: '1 cup'});
  var mustard = new WishlistItem ({ food: 'mustard',  amount: '1 cup'});
  return WishlistItem.create([ketchup, mustard]);
})
.then(function(savedWishlistItems) {
  console.log('Just saved', savedWishlistItems.length, 'wishlist items.');
  return WishlistItem.find({});
})
.then(function(allWishlistItems) {
  console.log('Printing all wishlist items:');
  allWishlistItems.forEach(function(wishlistItem) {
    console.log(wishlistItem);
  });
});

