const express = require("express");
const router = express.Router();
const User = require("../models/User");
const controller = require("../controllers/menuDashboardController");

router.get("/", controller.index);

// Route for creating or updating the entire inventory
router.post("/add-inventory", controller.createOrUpdateInventory);
router.post("/update-inventory", controller.createOrUpdateInventory);

module.exports = router;
