var mongoose = require('mongoose');
var User = require('./user');

var FridgeItemSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref : 'User' },
  food: { type: String, required: true },
  amount: { type: String, required: true },
  neighborhood: {type: String, required: true },
  meetingLocation: {type: String, required: false },
  photo: {type: String, required: false }
  },
  { timestamps: true }
);

function date2String(date) {
  var options = {
    weekday: 'long', year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

FridgeItemSchema.methods.getCreatedAt = function() {
  return date2String(this.createdAt);
};

FridgeItemSchema.methods.getUpdatedAt = function() {
  return date2String(this.updatedAt);
};

var autoPopulate = function(next) {
  this.populate('owner');
  next();
};

FridgeItemSchema.pre('findOne', autoPopulate);
FridgeItemSchema.pre('findById', autoPopulate);
FridgeItemSchema.pre('find', autoPopulate);

module.exports = mongoose.model('FridgeItem', FridgeItemSchema);

