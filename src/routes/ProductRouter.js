const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleWare");

//TẠO product
router.post("/create", authMiddleWare, ProductController.createProduct);

//update product
router.put("/update/:id", authMiddleWare, ProductController.updateProduct);

//delete product
router.delete("/delete/:id", authMiddleWare, ProductController.deleteProduct);

//getAll product
router.get("/getAll", ProductController.getAllProduct);

//get product by id
router.get("/getByProduct/:id", ProductController.getByProduct);

module.exports = router;
