const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./src/configs/db");
const connectCloudinary = require("./src/configs/cloudinary");
const { stripeWebhooks } = require("./src/controllers/orderController");
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

//allow multiple origins
const allowedOrigins = [
  "http://localhost:5173,https://greenbasket-chi.vercel.app",
];

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

//middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("hello world"));
app.use("/api", require("./src/routes/userRoutes"));
app.use("/api", require("./src/routes/sellerRoutes"));
app.use("/api", require("./src/routes/productRoutes"));
app.use("/api", require("./src/routes/cartRoutes"));
app.use("/api", require("./src/routes/addressRoute"));
app.use("/api", require("./src/routes/orderRoutes"));

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connection successful.");
    await connectCloudinary();
    console.log("✅ Cloudinary connection successful.");

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

// Start Server (function call)
startServer();
