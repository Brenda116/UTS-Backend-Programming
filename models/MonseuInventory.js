// Schema untuk Inventory Monseu
const mongoose = require("mongoose");

const monseuInventorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    text1: {
      type: String,
      required: true,
    },
    text2: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MonseuInventory = mongoose.model(
  "MonseuInventory",
  monseuInventorySchema
);

module.exports = MonseuInventory;
