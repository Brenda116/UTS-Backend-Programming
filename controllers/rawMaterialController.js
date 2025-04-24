const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const RawBarang = require("../models/RawBarang");
const Stock = require("../models/Stock");

module.exports = {
  // untuk menampilkan halaman daftar bahan mentah
  index: async (req, res) => {
    try {
      // mengambil semua data bahan mentah
      const rawBarangs = await RawBarang.find();

      // menambahkan data stok terakhir untuk setiap bahan mentah
      const rawBarangsWithStock = await Promise.all(
        rawBarangs.map(async (item) => {
          // mencari stok terbaru berdasarkan createdAt
          const lastStock = await Stock.findOne({ rawBarang: item._id })
            .sort({ createdAt: -1 }) // ambil stok terbaru
            .lean(); // mengembalikan data dalam bentuk plain JS object

          // menggabungkan data bahan mentah dan stok terakhir
          return {
            ...item.toObject(),
            lastStockJumlah: lastStock ? lastStock.jumlah : 0,
            lastStockLokasi: lastStock ? lastStock.lokasi : "-",
          };
        })
      );

      // render halaman EJS dengan data yang sudah digabung
      const content = await ejs.renderFile(
        path.join(__dirname, "../views/admin/raw_material.ejs"),
        {
          user: req.session.user,
          messages: req.flash(),
          rawBarangs: rawBarangsWithStock,
        }
      );

      // menampilkan halaman utama dengan konten yang sudah dirender
      res.render("layout", { body: content });
    } catch (err) {
      console.error(err);
      req.flash("error", "Gagal mengambil data.");
      res.redirect("/dashboard");
    }
  },

  // menyimpan data bahan mentah baru
  store: async (req, res) => {
    try {
      const { title, description, harga } = req.body;
      // Jjka ada file gambar, simpan path-nya
      const image = req.file ? `/uploads/${req.file.filename}` : null;

      // membuat instance RawBarang baru
      const newRawBarang = new RawBarang({
        title,
        description,
        harga,
        image,
      });

      // simpan ke dalam database
      await newRawBarang.save();

      req.flash("success", "Success add new raw materials");
      res.redirect("/admin/raw-materials");
    } catch (error) {
      console.error("Gagal menyimpan RawBarang:", error);
      res.status(500).send("Terjadi kesalahan saat menyimpan data.");
    }
  },

  // memperbarui data bahan mentah berdasarkan ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, harga } = req.body;

      const updateData = { title, description, harga };

      // jika ada file gambar baru, tambahkan ke data update
      if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
      }

      // memperbarui data di database berdasarkan ID
      await RawBarang.findByIdAndUpdate(id, updateData);

      req.flash("success", "Berhasil mengupdate bahan mentah.");
      res.redirect("/admin/raw-materials");
    } catch (error) {
      console.error("Gagal update RawBarang:", error);
      res.status(500).send("Terjadi kesalahan saat mengupdate data.");
    }
  },

  // menghapus data bahan mentah berdasarkan ID
  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      // mencari data berdasarkan ID
      const rawBarang = await RawBarang.findById(id);
      if (!rawBarang) {
        req.flash("error", "Data tidak ditemukan.");
        return res.redirect("/admin/raw-materials");
      }

      // jika data memiliki gambar, hapus file gambar dari sistem
      if (rawBarang.image) {
        const imagePath = path.join(__dirname, `../public${rawBarang.image}`);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      // menghapus data dari database
      await RawBarang.findByIdAndDelete(id);

      req.flash("success", "Data berhasil dihapus.");
      res.redirect("/admin/raw-materials");
    } catch (error) {
      console.error("Gagal menghapus RawBarang:", error);
      res.status(500).send("Terjadi kesalahan saat menghapus data.");
    }
  },
};
