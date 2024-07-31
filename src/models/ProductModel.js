const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
      unique: true,
    },
    image: {
      type: String,
      requied: true,
    },
    type: {
      type: String,
    },
    price: {
      type: Number,
      requied: true,
    },
    countInStrock: {
      type: Number,
      requied: true,
    },
    rating: {
      type: Number,
      requied: true,
    },
    description: {
      type: String,
      requied: true,
    },
    discount: {
      type: Number,
    },
    selled: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
