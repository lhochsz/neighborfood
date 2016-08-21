var mongoose = require('mongoose');
var User = require('./user');

var FridgeItemSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref : 'User' },
  food: { type: String, required: true },
  amount: { type: String, required: true },
  neighborhood: {type: String, required: true },
  contactInfo: {type: String, required: true},
  meetingLocation: {type: String, required: false }
  });

var autoPopulate = function(next) {
  this.populate('owner');
  next();
};

FridgeItemSchema.pre('findOne', autoPopulate);
FridgeItemSchema.pre('findById', autoPopulate);
FridgeItemSchema.pre('find', autoPopulate);

module.exports = mongoose.model('FridgeItem', FridgeItemSchema);

