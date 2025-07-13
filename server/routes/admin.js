const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controllers/adminController");
const { fetchOrders, markOrderReturned } = require("../controllers/orderController");
const rateLimit = require("express-rate-limit");
const verifyAdmin = require("../middleware/verifyAdmin");

// Rate limiter to protect login
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 5,
  message: { message: "Too many login attempts. Try again later." },
});

// Admin login
router.post("/login", loginLimiter, adminLogin);

// Token verification route for dashboard protection
router.get("/verify", verifyAdmin, (req, res) => {
  res.status(200).json({ message: "Authenticated" });
});

// Admin logout: clear token
router.post("/logout", (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// Admin order management routes
router.get("/orders", verifyAdmin, fetchOrders);
router.post("/orders/mark-returned", verifyAdmin, markOrderReturned);

module.exports = router;
