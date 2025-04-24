const express = require("express"); // Import express 
const router = express.Router(); // Membuat instance router
const User = require("../models/User"); // Import model user 
const controller = require("../controllers/stockController"); // Import controller (CRUD) untuk stock barang
const { requireAuth, requireAdmin } = require("../middlewares/authMiddleware"); // Import middleware untuk aitentikasi admin

// Route GET utama untuk menampilkan data stock
// Hanya dapat diakses oleh admin yang sudah login
router.get("/", requireAuth, requireAdmin, controller.index);

// Route POST untuk melakuakn update data stock
// Hanya dapat diakses oleh admin yang sudah login
router.post("/update", requireAuth, requireAdmin, controller.update);

// Ekspor router agar bisa digunakan di file utama aplikasi
module.exports = router;
