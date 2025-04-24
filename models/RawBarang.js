// models/RawBarang.js
const mongoose = require("mongoose");

const rawBarangSchema = new mongoose.Schema(
  {
    image: {
      type: String, // URL atau nama file
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    harga: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RawBarang", rawBarangSchema);
