var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var FridgeItem = require('./fridge');

var UserSchema = new mongoose.Schema({
  local : {
    firstName: String,
    lastName: String,
    email    : String,
    password : String
  },
  // fridgeItems : [FridgeItem.schema],
  fridgeItems : [ { type : mongoose.Schema.Types.ObjectId, ref  : 'FridgeItem' } ]
});

var autoPopulate = function(next) {
  this.populate('fridgeItems');
  next();
};

UserSchema.pre('findOne', autoPopulate);
UserSchema.pre('findById', autoPopulate);

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
