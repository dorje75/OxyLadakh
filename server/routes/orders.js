const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  try {
    const { customerName, phoneNumber, address, items } = req.body;

    // Safety check
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Cart items are missing or invalid" });
    }

    // Transform items: rentals get 1-day default + rentalStartDate
    const transformedItems = items.map(item => ({
      productId: new mongoose.Types.ObjectId(item.productId),
      name: item.name,
      type: item.type,
      quantity: item.quantity,
      price: item.price,
      durationDays: item.type === "rental" ? 1 : undefined, // 1-day advance charged
      rentalStartDate: item.type === "rental" ? new Date() : undefined,
      rentalEndDate: null,
      actualDays: null
    }));

    // Create and save the order
    const newOrder = new Order({
      customerName,
      phoneNumber,
      address,
      items: transformedItems
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", orderId: newOrder._id });
  } catch (err) {
    console.error("Order save error:", err.message);
    res.status(500).json({ error: "Server error while placing order" });
  }
});

module.exports = router;
