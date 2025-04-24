const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const stockRoutes = require("./routes/stockRoutes");
const rawMaterialRoutes = require("./routes/rawMaterialRoutes");
const menuDashboardRoutes = require("./routes/menuDashboardRoutes");
const userRoutes = require("./routes/userRoutes");



const flash = require("connect-flash");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// Session middleware should come before flash middleware
const session = require("express-session");

app.use(
  session({
    secret: process.env.KEY, // Ensure your .env file contains KEY
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Flash messages should come after session
app.use(flash());

// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Routes for users and auth
app.use("/auth", authRoutes);
app.use("/admin/stock", stockRoutes);
app.use("/admin/raw-materials", rawMaterialRoutes);
app.use("/admin/menu-dashboard", menuDashboardRoutes);
app.use("/admin/user", userRoutes);

app.use("/", homeRoutes);


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
