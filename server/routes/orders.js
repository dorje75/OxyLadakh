const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST /api/orders
router.post("/", async (req, res) => {
  console.log("Incoming Order:", req.body);
  console.log("Incoming Order:", req.body);
  console.log("Type of items:", typeof req.body.items);
  console.log("Type of items[0]:", typeof req.body.items[0]);

  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
