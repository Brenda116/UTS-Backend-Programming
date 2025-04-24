const express = require("express");
const router = express.Router();
const User = require("../models/User");
const controller = require("../controllers/homeController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/admin", controller.index);

router.get("/dashboard", requireAuth, controller.indexCustomer);
router.get("/", requireAuth, controller.indexCustomer);
router.get("/popular", requireAuth, controller.popular);

module.exports = router;
