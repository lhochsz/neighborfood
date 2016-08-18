var mongoose = require('mongoose');

var FridgeItemSchema = new mongoose.Schema({
  food: { type: String, required: true },
  amount: { type: String, required: true },
  neighborhood: {type: String, required: true },
  meetingLocation: {type: String, required: false }
});

module.exports = mongoose.model('FridgeItem', FridgeItemSchema);
