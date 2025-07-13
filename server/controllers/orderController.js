const Order = require("../models/Order");

exports.fetchOrders = async (req, res) => {
  try {
    const { type, status } = req.query;
    let query = {};

    if (type === "rental") query.orderType = "rental";
    else if (type === "purchase") query.orderType = "purchase";

    if (status === "returned") query.returned = true;
    else if (status === "pending") query.returned = false;

    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

exports.markOrderReturned = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order || order.orderType !== "rental") {
      return res.status(404).json({ message: "Rental order not found" });
    }

    if (order.returned) {
      return res.status(400).json({ message: "Order already marked as returned" });
    }

    const startDate = new Date(order.rentalStartDate);
    const endDate = new Date();
    const actualDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    order.rentalEndDate = endDate;
    order.actualDays = actualDays;
    order.returned = true;
    order.finalBill = actualDays * order.pricePerDay;

    await order.save();
    res.json({ message: "Order marked as returned", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order" });
  }
};