var mongoose = require('mongoose');
var User = require('./models/user');
var FridgeItem = require('./models/fridge');
mongoose.Promise = require('bluebird');

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

FridgeItem.remove({})
.then(function() {
  console.log('old fridge items removed');
  quit();
}, function(err) {
  return handleError(err);
});
