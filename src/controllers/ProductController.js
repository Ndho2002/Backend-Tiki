const ProductService = require("../services/ProductService");
const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      type,
      price,
      countInStrock,
      rating,
      description,
      discount,
    } = req.body;
    if (
      !name ||
      !image ||
      !type ||
      !price ||
      !countInStrock ||
      !rating ||
      !description ||
      !discount
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "Vui lòng nhập tất cả thông tin",
      });
    }
    const response = await ProductService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Không tìm thấy sản phẩm",
      });
    }
    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(500).json({
        status: "ERROR",
        message: "Không tìm thấy sản phẩm",
      });
    }
    const response = await ProductService.deteleProduct(productId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;

    const response = await ProductService.getAllProduct(
      Number(limit) || 8,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getByProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await ProductService.getByProduct(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getByProduct,
};
