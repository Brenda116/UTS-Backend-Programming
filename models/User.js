// Import libary mongoose agar dapat berinterakti dengan database
const mongoose = require("mongoose");
// Membuat skema untuk data User
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String, // Tipe data harus string
      required: true, // Wajib untuk diisi
      trim: true, // Menghapus spasi berlebih di awal/akhir
    },
    email: {
      type: String,
      required: true, // Wajib untuk diisi
      unique: true, // Tidak boleh ada email yang sama
      lowercase: true, // Disimpan dalam huruf kecil
      trim: true, // Menghapus spasi berlebih
    },
    password: { // Menyimpan password user
      type: String,
      required: true,
    },
    role: { // Menetapkan peran user diantara admin atau seorang customer
      type: String,
      enum: ["admin", "customer"], // Hanya boleh salah satu dari dua nilai ini
      default: "customer", // Jika tidak diisi, otomatis akan menjadi "customer"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
