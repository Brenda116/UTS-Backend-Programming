// Import model User dari folder models
const User = require("../models/User");
// Import bcrypt untuk hashing dan verifikasi password
const bcrypt = require("bcrypt");

// Ekspor objek yang berisi fungsi-fungsi untuk menangani autentikasi
module.exports = {
  // Menampilkan halaman login
  showLogin: (req, res) => {
    res.render("login", { messages: req.flash() });
  },

  // Menampilkan halaman registrasi
  showRegister: (req, res) => {
    res.render("register", { messages: req.flash() });
  },

  // Fungsi untuk mendaftarkan pengguna baru
  registerUser: async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
       // Untuk cek apakah email sudah pernah digunakan oleh user lain
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // Jika sudah, mengirim pesan ini dan akan-
        req.flash("error", "Email already registered");
        // kembali ke halaman register
        return res.redirect("/auth/register");
      }

      // Hash password menggunakan bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Membuat user baru untuk di simpan dalam database
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || "customer", // Default role adalah 'customer' jika role kosong
      });

      // Menyimpan user ke database
      await user.save();

      // Tampilkan pesan sukses dan redirect ke halaman login
      req.flash("success", "Registration successful! Please log in.");
      res.redirect("/auth");
    } catch (err) {
      // Jika terjadi error saat proses registrasi, akan menampilkan pesan ini dan kembali ke halaman register
      req.flash("error", "Registration failed: " + err.message);
      res.redirect("/auth/register");
    }
  },

  // Fungsi untuk menangani psroses login user
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Mencari user dari email di database
      const user = await User.findOne({ email : email });
      console.log(user)
      if (!user) {
        req.flash("error", "User not found"); // Jika user tidak ditemukan, ditampilkan pesan ini
        return res.redirect("/auth");
      }

      // Cek apakah password yang dimasukkan cocok dengan hash di database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        req.flash("error", "Incorrect email or password"); // Menampilkan pesan ini ika password salah
        return res.redirect("/auth");
      }

      // Menyimpan data user ke session
      req.session.user = {
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      };

      // Membuat cookie dari session user
      res.cookie("user", req.session.user, {
        httpOnly: true, // agar tidak dapat diakases oleh JavaScript
        maxAge: 1000 * 60 * 60 * 24, // yang berlaku selama 24 hours
      });

      req.flash("success", "Successfully logged in!");

      // Jika user adalah admin, akan diarahkan ke halaman admin
      if(user.role == 'admin'){
        return res.redirect('/admin')
      }

      // Jika bukan admin, akan diarahkan ke halaman dashboard
      res.redirect("/dashboard");
    } catch (err) {
      // Jika terjadi error saat login, akan ditampilkan pesan error ini
      req.flash("error", "Login failed: " + err.message);
      res.redirect("/auth");
    }
  },

  // Fungsi untuk logout user
  logoutUser: (req, res) => {
    res.clearCookie("user"); // Akan menghapus cookie dari browser
    req.session.destroy(); // Akan menghapus semua data session (logout)
    res.redirect("/auth"); // Akan kembali ke halaman login
  },
};
