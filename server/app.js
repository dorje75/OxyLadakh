const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // allow frontend
    credentials: true,               // allow cookies
  })
);

app.use(express.json());
app.use(cookieParser());

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const inventoryRoutes = require("./routes/inventory");
const adminRoutes = require("./routes/admin");

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Oxygen Delivery API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
