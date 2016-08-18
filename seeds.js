var mongoose = require('mongoose');
var FridgeItem = require('./models/fridge');
mongoose.Promise = require('bluebird')

mongoose.connect('mongodb://localhost/fridge');

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

console.log('removing old fridge items...');
FridgeItem.remove({})
.then(function() {
  console.log('old fridge items removed');
  console.log('creating some fridge items...');
  var butter  = new FridgeItem ({ food: 'butter',  amount: '1 cup'});
  var pickles = new FridgeItem ({ food: 'pickles',  amount: '1 cup'});
  return FridgeItem.create([butter, pickles]);
})
.then(function(savedFridgeItems) {
  console.log('Just saved', savedFridgeItems.length, 'fridge items.');
  return FridgeItem.find({});
})
.then(function(allFridgeItems) {
  console.log('Printing all fridge items:');
  allFridgeItems.forEach(function(fridgeItem) {
    console.log(fridgeItem);
  });
});




