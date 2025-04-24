const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const MonseuInventory = require("../models/monseuInventory");
const Stock = require("../models/Stock");

module.exports = {
  // function untuk menampilkan halaman index pada admin
  index: async (req, res) => {
    const latestInventory = await MonseuInventory.findOne().sort({
      createdAt: -1,
    });
    const content = await ejs.renderFile(
      path.join(__dirname, "../views/admin/index.ejs"),
      {
        menu: latestInventory,
        user: req.session.user,
      }
    );
    return res.render("layout", { body: content });
  },

  // halaman index pada customer
  indexCustomer: async (req, res) => {
    const latestInventory = await MonseuInventory.findOne().sort({
      createdAt: -1,
    });
    const content = await ejs.renderFile(
      path.join(__dirname, "../views/customer/index.ejs"),
      {
        menu: latestInventory,
        user: req.session.user,
      }
    );
    res.render("customer_layout", { body: content });
  },

  // halaman produk pupuler/terlaris pada customer
  popular: async (req, res) => {
    // ambil barang dengan last stock
    const stocks = await Stock.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$rawBarang",
          stockId: { $first: "$_id" },
          jumlah: { $first: "$jumlah" },
          lokasi: { $first: "$lokasi" },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $lookup: {
          from: "rawbarangs",
          localField: "_id",
          foreignField: "_id",
          as: "rawBarang",
        },
      },
      { $unwind: "$rawBarang" },
    ]);

    let popularBarang = null;
    let minJumlah = Infinity;

    // ambil semua material dan ambil stock barang terkecil untuk dijadikan barang terpopuler/terlaris
    stocks.forEach((stock) => {
      if (stock.jumlah != 0 && stock.jumlah < minJumlah) {
        minJumlah = stock.jumlah;
        popularBarang = stock;
      }
    });

    // ambil barang lain kecuali barang terpopuler/terlaris
    const remainingStocks = stocks.filter(
      (s) => s._id.toString() !== popularBarang?._id.toString()
    );

    const content = await ejs.renderFile(
      path.join(__dirname, "../views/customer/popular.ejs"),
      {
        stocks: remainingStocks,
        popularBarang,
        user: req.session.user,
      }
    );

    res.render("customer_layout", { body: content });
  },
};
