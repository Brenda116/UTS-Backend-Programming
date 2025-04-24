const ejs = require("ejs"); // Untuk merender template EJS
const fs = require("fs"); // Untuk operasi file (tidak digunakan di sini)
const path = require("path"); // Untuk manipulasi path file
const Stock = require("../models/Stock"); // Model Stock (stok bahan baku)
const RawBarang = require("../models/RawBarang"); // Model bahan baku

module.exports = {
  // Menampilkan halaman utama stok bahan baku
  index: async (req, res) => {
    // Ambil semua data bahan baku
    const rawMaterials = await RawBarang.find();

    // Tambahkan informasi stok terbaru ke masing-masing bahan baku
    const updatedRawMaterials = await Promise.all(
      rawMaterials.map(async (item) => {
        // Cari stok terbaru untuk setiap bahan baku
        const lastStock = await Stock.findOne({ rawBarang: item._id }).sort({
          createdAt: -1, // Ambil stok terakhir berdasarkan waktu dibuat
        });

        // Konversi item ke object biasa dan tambahkan properti stock
        const itemWithStock = item.toObject();
        itemWithStock.stock = lastStock ? lastStock.jumlah : 0;

        return itemWithStock;
      })
    );

    let stocks = [];

    // Jika ada query parameter rawMaterialId, ambil semua histori stok-nya
    if (req.query.rawMaterialId) {
      stocks = await Stock.find({
        rawBarang: req.query.rawMaterialId,
      }).populate("rawBarang"); // Populate untuk mengakses detail bahan bakunya
    }

    // Render halaman stok dengan data bahan baku dan histori stok
    const content = await ejs.renderFile(
      path.join(__dirname, "../views/admin/stock.ejs"),
      {
        rawMaterials: updatedRawMaterials, // Data bahan baku dengan stok terbaru
        stocks, // Data histori stok (jika ada ID bahan baku yang dipilih)
        selectedId: req.query.rawMaterialId || null, // ID bahan baku yang dipilih (jika ada)
        user: req.session.user, // Data user dari session
        messages: req.flash(), // Flash messages
      }
    );

    // Tampilkan layout utama dengan isi halaman stok
    return res.render("layout", { body: content });
  },

  // Menambahkan data stok baru
  update: async (req, res) => {
    try {
      const { rawBarangId, jumlah } = req.body;

      // Validasi input: pastikan rawBarangId ada dan jumlah berupa angka
      if (!rawBarangId || typeof jumlah !== "number") {
        return res.status(400).json({ message: "Invalid data" });
      }

      // Buat entri stok baru
      const stokBaru = new Stock({
        rawBarang: rawBarangId,
        jumlah: jumlah,
      });

      // Simpan ke database
      await stokBaru.save();

      // Kirim respons sukses
      res
        .status(200)
        .json({ message: "Stock updated successfully", data: stokBaru });
    } catch (err) {
      // Tangani error jika ada kesalahan server
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
};
