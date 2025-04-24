// Import library multer untuk menangani upload file
const multer = require("multer");
// Import path untuk mengelola dan memanipulasi path file
const path = require("path");

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  // Menentukan folder tujuan penyimpanan file yang diupload
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // File akan disimpan di folder 'public/uploads/'
  },

  // Menentukan nama file yang disimpan
  filename: function (req, file, cb) {
    // Membuat nama unik menggunakan timestamp dan angka acak
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Gabungkan nama unik dengan ekstensi file asli
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Inisialisasi multer dengan konfigurasi penyimpanan
const upload = multer({ storage: storage });

// Ekspor middleware upload agar bisa digunakan di route
module.exports = upload;
