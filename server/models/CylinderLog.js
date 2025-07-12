const mongoose = require('mongoose');

const CylinderLogSchema = new mongoose.Schema({
  cylinderId: { type: String, required: true },
  renterName: String,
  phoneNumber: String,
  rentDate: { type: Date, default: Date.now },
  expectedReturnDate: Date,
  actualReturnDate: Date,
  isReturned: { type: Boolean, default: false },
  lateDays: { type: Number, default: 0 },
  lateFeeCharged: { type: Number, default: 0 }
});

module.exports = mongoose.model('CylinderLog', CylinderLogSchema);
