const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();
require("../middleware/authMiddleWare");
const dotenv = require("dotenv");

dotenv.config();

//TẠO product
router.get("/config", (req, res) => {
  return res.status(200).json({
    status: "OK",
    data: process.env.CLIEND_ID,
  });
});

module.exports = router;
