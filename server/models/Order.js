const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      type: String,
      quantity: Number,
      price: Number,
      durationDays: Number
    }
  ],
  customerName: String,
  phoneNumber: String,
  address: String,
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' }
});

// ✅ Clean old cached version
delete mongoose.connection.models['Order'];

module.exports = mongoose.model('Order', OrderSchema);
