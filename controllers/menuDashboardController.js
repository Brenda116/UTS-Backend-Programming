const ejs = require("ejs"); // Module untuk render file EJS
const fs = require("fs"); // Module untuk operasi file
const path = require("path"); // Module untuk menangani path file
const MonseuInventory = require("../models/monseuInventory"); // Model Mongoose untuk inventory

module.exports = {
  // Method untuk menampilkan halaman dashboard inventory
  index: async (req, res) => {
    try {
      // Ambil data inventory terbaru berdasarkan tanggal pembuatan (createdAt)
      const latestInventory = await MonseuInventory.findOne().sort({
        createdAt: -1,
      });

      // Menentukan apakah tombol di halaman adalah "Tambah" atau "Update"
      const buttonText = latestInventory ? "Update" : "Tambah";
      const actionUrl = latestInventory
        ? "/update-inventory" // Jika data inventory ada, gunakan endpoint update
        : "/add-inventory"; // Jika tidak ada data, gunakan endpoint tambah

      // Render file EJS dengan data yang telah disiapkan
      const content = await ejs.renderFile(
        path.join(__dirname, "../views/admin/menu_home.ejs"),
        {
          user: req.session.user, // Informasi user dari session
          menu: latestInventory, // Data inventory yang terakhir
          buttonText: buttonText, // Teks tombol (Tambah/Update)
          actionUrl: actionUrl, // URL aksi form
          messages: req.flash(), // Flash messages untuk notifikasi
        }
      );

      // Render layout utama dengan konten yang telah di-render
      return res.render("layout", { body: content });
    } catch (err) {
      // Tangani error jika gagal mengambil data inventory
      console.error("Error fetching latest inventory data:", err);
      req.flash("error", "Failed to load latest inventory data.");
      res.redirect("/admin/menu-dashboard");
    }
  },

  // Method untuk membuat atau memperbarui data inventory
  createOrUpdateInventory: async (req, res) => {
    try {
      // Ambil data input dari form
      const { newTitle, newDescription, newText1, newText2 } = req.body;

      // Cek apakah data inventory sudah ada
      let inventory = await MonseuInventory.findOne().sort({ createdAt: -1 });

      if (inventory) {
        // Jika ada, update data yang diperlukan (gunakan nilai lama jika tidak ada input baru)
        inventory.title = newTitle || inventory.title;
        inventory.description = newDescription || inventory.description;
        inventory.text1 = newText1 || inventory.text1;
        inventory.text2 = newText2 || inventory.text2;

        await inventory.save(); // Simpan perubahan
        req.flash("success", "Inventory updated successfully.");
      } else {
        // Jika tidak ada, buat data baru
        inventory = new MonseuInventory({
          title: newTitle,
          description: newDescription,
          text1: newText1,
          text2: newText2,
        });

        await inventory.save(); // Simpan data baru
        req.flash("success", "Inventory created successfully.");
      }

      // Redirect kembali ke halaman dashboard inventory
      res.redirect("/admin/menu-dashboard");
    } catch (err) {
      // Tangani error jika terjadi kesalahan saat menyimpan data
      console.error("Error creating/updating inventory:", err);
      req.flash("error", "Failed to create or update inventory.");
      res.redirect("/admin/menu-dashboard");
    }
  },
};
