const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    type: String,
    quantity: Number,
    price: Number,
    durationDays: { type: Number, default: 1 }, // Always 1-day advance charged
    rentalStartDate: Date,    // Set at order time if rental
    rentalEndDate: Date,      // Set when returned
    actualDays: Number        // Calculated when returned
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema({
  items: { type: [OrderItemSchema], required: true },
  customerName: String,
  phoneNumber: String,
  address: String,
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: "pending" }
});

// Only needed during development to avoid OverwriteModelError
// Can be removed in production or replaced with:
// module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
delete mongoose.connection.models["Order"];

module.exports = mongoose.model("Order", OrderSchema);
