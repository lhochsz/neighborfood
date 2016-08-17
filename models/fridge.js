var mongoose = require('mongoose');

var FridgeItemSchema = new mongoose.Schema({
  food: { type: String, required: true },
  amount: { type: String, required: true }
});

module.exports = mongoose.model('FridgeItem', FridgeItemSchema);
