// Middleware untuk mengecek apakah user sudah login
function requireAuth(req, res, next) {
  // Cek apakah session dan data user tersedia
  if (req.session && req.session.user) {
    next(); // Lanjut ke middleware/route berikutnya
  } else {
    // Jika belum login, redirect ke halaman login
    req.flash("error", "Silakan login terlebih dahulu");
    return res.redirect("/auth");
  }
}

// Middleware untuk membatasi akses hanya untuk user dengan role 'admin' atau 'user'
function allowUserAndAdmin(req, res, next) {
  const role = req.session?.user?.role; // Ambil role dari session user
  if (role === "admin" || role === "user") {
    return next(); // Jika admin atau user, lanjutkan
  }
  // Jika bukan admin atau user, menolak akses
  req.flash("error", "Akses ditolak");
  return res.redirect("/auth");
}

// Middleware untuk membatasi akses hanya untuk admin
function requireAdmin(req, res, next) {
  const role = req.session?.user?.role; // Ambil role dari session user
  if (role === "admin") {
    return next(); // Jika admin, lanjutkan
  }
  // Jika bukan admin, tolak akses
  req.flash("error", "Akses khusus admin");
  return res.redirect("/auth");
}

// Ekspor semua middleware agar bisa digunakan di file route
module.exports = {
  requireAuth,
  allowUserAndAdmin,
  requireAdmin,
};
