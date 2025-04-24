const ejs = require("ejs"); // Modul untuk render file EJS
const path = require("path"); // Untuk menangani path file
const User = require("../models/User"); // Model User dari database
const bcrypt = require("bcrypt"); // Untuk enkripsi password

module.exports = {
  // Menampilkan daftar semua user
  index: async (req, res) => {
    try {
      const user = await User.find(); // Ambil semua data user

      // Render halaman daftar user dengan layout utama
      const content = await ejs.renderFile(
        path.join(__dirname, "../views/admin/user.ejs"),
        {
          users: user,
          user: req.session.user, // User yang sedang login (untuk keperluan tampilan)
          messages: req.flash(), // Flash message (sukses/error)
        }
      );
      return res.render("layout", { body: content });
    } catch (error) {
      console.error(error);
      req.flash("error", "Gagal memuat data pengguna.");
      res.redirect("/");
    }
  },

  // Menampilkan form untuk menambahkan user baru
  createForm: async (req, res) => {
    const content = await ejs.renderFile(
      path.join(__dirname, "../views/admin/user-create.ejs"),
      {
        user: req.session.user,
        messages: req.flash(),
      }
    );
    return res.render("layout", { body: content });
  },

  // Proses tambah user ke database
  create: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      // Enkripsi password sebelum disimpan
      const hashedPassword = await bcrypt.hash(password, 10);

      // Simpan user baru ke database
      await User.create({ name, email, password: hashedPassword, role });

      req.flash("success", "User berhasil ditambahkan.");
      res.redirect("/admin/user");
    } catch (error) {
      console.error(error);
      req.flash("error", "Gagal menambahkan user.");
      res.redirect("/admin/user/create");
    }
  },

  // Menampilkan form edit untuk user tertentu berdasarkan ID
  editForm: async (req, res) => {
    try {
      const userData = await User.findById(req.params.id); // Ambil data user berdasarkan ID

      const content = await ejs.renderFile(
        path.join(__dirname, "../views/admin/user-edit.ejs"),
        {
          userData, // Data user yang ingin diedit
          user: req.session.user,
          messages: req.flash(),
        }
      );
      return res.render("layout", { body: content });
    } catch (error) {
      console.error(error);
      req.flash("error", "Gagal memuat data user.");
      res.redirect("/admin/user");
    }
  },

  // Proses update user ke database
  update: async (req, res) => {
    try {
      const { name, email, role } = req.body;

      // Update data user berdasarkan ID
      await User.findByIdAndUpdate(req.params.id, { name, email, role });

      req.flash("success", "User berhasil diperbarui.");
      res.redirect("/admin/user");
    } catch (error) {
      console.error(error);
      req.flash("error", "Gagal memperbarui user.");
      res.redirect(`/admin/user/edit/${req.params.id}`);
    }
  },

  // Menghapus user berdasarkan ID
  delete: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id); // Hapus user
      req.flash("success", "User berhasil dihapus.");
    } catch (error) {
      console.error(error);
      req.flash("error", "Gagal menghapus user.");
    }
    res.redirect("/admin/user"); // Redirect kembali ke daftar user
  },
};
