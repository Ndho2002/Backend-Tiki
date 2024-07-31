const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
    const { itemsPrice, totalPrice, fullName, address, phone } = req.body;
    if (!itemsPrice || !totalPrice || !fullName || !address || !phone) {
      return res.status(200).json({
        status: "ERR",
        message: "Vui lòng nhập tất cả thông tin",
      });
    }
    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await OrderService.getAllOrder(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getDetailsOrder = async (req, res) => {
  try {
    const idOrder = req.params.id;
    const response = await OrderService.getDetailsOrder(idOrder);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const deleteDetailsOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const data = req.body;

    if (!orderId) {
      return res.status(500).json({
        status: "ERROR",
        message: "Không tìm thấy sản phẩm",
      });
    }
    const response = await OrderService.deleteDetailsOrder(orderId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const allOrder = async (req, res) => {
  try {
    const { filter } = req.query;
    const response = await OrderService.allOrder(filter);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const data = req.body;
    const response = await OrderService.updateOrder(orderId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  getDetailsOrder,
  deleteDetailsOrder,
  allOrder,
  updateOrder,
};
