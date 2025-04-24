const express = require("express");
const router = express.Router();
const User = require("../models/User");
const controller = require("../controllers/stockController");
const { requireAuth, requireAdmin } = require("../middlewares/authMiddleware");
router.get("/", requireAuth, requireAdmin, controller.index);
router.post("/update", requireAuth, requireAdmin, controller.update);

module.exports = router;
