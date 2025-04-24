const express = require("express");
const router = express.Router();
const User = require("../models/User");
const controller = require("../controllers/rawMaterialController");
const upload = require("../middlewares/upload");
const { requireAuth, requireAdmin } = require("../middlewares/authMiddleware");

router.get("/", requireAuth, requireAdmin, controller.index);

router.post(
  "/",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  controller.store
);
router.post("/update/:id", upload.single("image"), requireAuth , requireAdmin, controller.update);
router.post("/delete/:id", requireAuth, requireAdmin, controller.destroy);
module.exports = router;
