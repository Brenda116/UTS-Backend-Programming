// Mengimpor express dan objek router untuk menangani route yang berkaitan dengan autentikasi(login, register, dan logout)
const express = require("express");
const router = express.Router();
// Mengimpor controller yang berisi fungsi-fungsi untuk login, register, dan logout dari controllers
const authController = require("../controllers/authController");

// Jika user membuka "/auth", maka akan ditampilkan halaman login
router.get("/", authController.showLogin);
// Proses login
router.post("/", authController.loginUser);
// Jika user membuka "/auth/register", akan ditampilkan halaman register
router.get("/register", authController.showRegister);
// Proses register akun baru
router.post("/register", authController.registerUser);
// Route untuk logout, jadi ketika user menekan tombol logout, request dikirim disini untuk dihapus session dan cookie
router.post("/logout", authController.logoutUser);

module.exports = router;
