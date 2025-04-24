// models/Stock.js
// Schema untuk stock barang
const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    rawBarang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RawBarang",
      required: true,
    },
    jumlah: {
      type: Number,
      required: true,
    },
    lokasi: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stock", stockSchema);
