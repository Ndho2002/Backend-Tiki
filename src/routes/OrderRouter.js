const express = require("express");
const OrderController = require("../controllers/OrderController");
const router = express.Router();
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleWare");

//TẠO product
router.post("/create/:id", authUserMiddleWare, OrderController.createOrder);

router.get("/get-all-order/:id", OrderController.getAllOrder);
router.get("/get-details-order/:id", OrderController.getDetailsOrder);
router.delete("/delete-details-order/:id", OrderController.deleteDetailsOrder);
router.get("/all-order", authMiddleWare, OrderController.allOrder);
router.put("/update-order/:id", authMiddleWare, OrderController.updateOrder);

module.exports = router;
