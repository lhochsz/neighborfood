var mongoose = require('mongoose');
var User = require('./models/user');
var FridgeItem = require('./models/fridge');
mongoose.Promise = require('bluebird');

// Connect to database
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect('mongodb://localhost/fridge');
}
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);
mongoose.connection.once('open', function() {
  console.log("Mongoose has connected to MongoDB!");
});

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

console.log('removing old users...');
User.remove({})
.then(function() {
  console.log('old users removed');
  console.log('removing old fridge items...');
  return FridgeItem.remove({})
})
.then(function() {
  console.log('old fridge items removed');
  var newUser = new User();
  newUser.local.email    = 'joe@foody.com';
  newUser.local.password = newUser.encrypt('test1234');
  newUser.firstName = 'Joe';
  newUser.lastName = 'Foody';
  var promise1 = newUser.save();

  console.log('creating some fridge items...');
  var butter  = new FridgeItem ({ owner: newUser._id, food: 'butter',  amount: '1 cup', neighborhood: 'Midtown', meetingLocation: 'PCM', photo: 'http://img.foodnetwork.com/FOOD/2012/06/15/HE_butter_s4x3_lead.jpg' });
  var pickles = new FridgeItem ({ owner: newUser._id, food: 'pickles',  amount: '1 cup', neighborhood: 'Midtown', meetingLocation: 'PCM', photo: 'http://eatyourworld.com/images/staff_food_entries/pickles.jpg' });
  var promise2 = FridgeItem.create([butter, pickles]);

  return [promise1, promise2];
})
.spread(function(newUser, savedFridgeItems) {
  console.log('Just saved', savedFridgeItems.length, 'fridge items.');
  savedFridgeItems.forEach( function(item) { newUser.fridgeItems.push(item._id); });
  return newUser.save();
})
.then(function(updatedUser) {
  console.log('updatedUser:', updatedUser);
  return FridgeItem.find({});
})
.then(function(allFridgeItems) {
  console.log('Printing all fridge items:');
  allFridgeItems.forEach(function(fridgeItem) {
    console.log(fridgeItem);
  });
  quit();
}, function(err) {
  return handleError(err);
});
