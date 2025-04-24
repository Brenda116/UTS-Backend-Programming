// Mengimpor library express untuk membuat router
const express = require("express");
const router = express.Router();
// Mengimpor model User dari file '../models/User' untuk berinteraksi dengan data pengguna
const User = require("../models/User");
// Mengimpor controller untuk mengelola logika aplikasi terkait pengguna
const controller = require("../controllers/userController");
// Mengimpor middleware untuk otentikasi dan otorisasi
const { requireAdmin, requireAuth } = require("../middlewares/authMiddleware");

// Rute GET untuk menampilkan data pengguna, dengan middleware requireAuth dan requireAdmin
// Artinya hanya pengguna yang sudah terautentikasi dan memiliki peran admin yang dapat mengakses
router.get("/", requireAuth, requireAdmin, controller.index);

// Rute POST untuk membuat data pengguna baru
// Middleware requireAuth dan requireAdmin memastikan hanya admin yang dapat membuat pengguna baru
router.post("/create", requireAuth, requireAdmin, controller.create);

// Rute POST untuk memperbarui data pengguna berdasarkan ID pengguna yang diberikan dalam URL
// Middleware requireAuth dan requireAdmin memastikan hanya admin yang dapat memperbarui data pengguna
router.post("/edit/:id", requireAuth, requireAdmin, controller.update);

// Rute POST untuk menghapus data pengguna berdasarkan ID pengguna yang diberikan dalam URL
// Middleware requireAuth dan requireAdmin memastikan hanya admin yang dapat menghapus pengguna
router.post("/delete/:id", requireAuth, requireAdmin, controller.delete);

module.exports = router;
