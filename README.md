# MONSEU'S MINIMARKET INVENTORY PROJECT PROGRESS
Berikut adalah laporan mengenai perkembangan pengerjaan projek kami per-tanggal **24 April 2025.**
## Controllers
Kami telah membuat berbagai macam _controllers_ untuk berbagai kegunaan.
* authController.js, untuk menangani proses registrasi, log in, serta log out _user_.
* homeController.js, untuk menampilkan halaman utama untuk admin dan customer.
* menuDashboardController.js, mengelola konten utama pada dashboard.
* rawMaterialController.js, CRUD untuk produk-produk toko.
* stockController.js, untuk manajemen stok produk-produk.
* userController.js, untuk manajemen para _user_ (hanya kuasa admin).
## Middleware
* authMiddleware.js:
    * requireAuth: Memastikan user sudah login
    * requireAdmin: Membatasi akses hanya untuk admin
* upload.js: Menangani upload file gambar menggunakan multer
## Models (MongoDB)
* MonseuInventory.js: Skema untuk konten utama dashboard
* RawBarang.js: Skema bahan baku
* Stock.js: Skema stok barang
* User.js: Skema user dengan role admin/customer
## Routes
Menghubungkan URL dengan controller yang sesuai:
* authRoutes.js: Route untuk autentikasi
* homeRoutes.js: Route halaman utama
* menuDashboardRoutes.js: Route dashboard admin
* rawMaterialRoutes.js: Route bahan baku
* stockRoutes.js: Route manajemen stok
* userRoutes.js: Route manajemen user
## Views (EJS)
* Layout terpisah untuk admin dan customer.
* _Partial components_ untuk header, footer, dan notifikasi.
* Halaman khusus:
    * Admin: raw_material, stock, user management
    * Customer: popular items, dashboard sederhana
