const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['sale', 'rental'], required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  description: { type: String },
  inStock: { type: Boolean, default: true },
  durationDays: { type: Number },
  refundableDeposit: { type: Number }
});

module.exports = mongoose.model('Product', ProductSchema);
