var mongoose = require('mongoose');

var WishlistItemSchema = new mongoose.Schema({
  food: { type: String, required: true },
  amount: { type: String, required: true }
});

module.exports = mongoose.model('WishlistItem', WishlistItemSchema);
