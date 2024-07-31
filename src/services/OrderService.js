const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");
const EmailServices = require("./EmailServices.js");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      itemsPrice,
      totalPrice,
      fullName,
      address,
      phone,
      user,
      isPaid,
      paiAt,
      paymentMethod,
      email,
    } = newOrder;

    try {
      const promises = orderItems.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            countInStrock: { $gte: order.amount },
          },
          {
            $inc: {
              countInStrock: -order.amount,
              selled: +order.amount,
            },
          },
          { new: true }
        );
        if (productData) {
          return {
            status: "OK",
            message: "SUCCESS",
          };
        } else {
          return {
            status: "OK",
            message: "ERR",
            id: order.product,
          };
        }
      });
      const results = await Promise.all(promises);
      const newData = results && results.filter((item) => item.id);
      if (newData.length) {
        const arrId = [];
        newData.forEach((item) => {
          arrId.push(item.id);
        });
        resolve({
          status: "ERR",
          message: `Sản phẩm với id${arrId.join(",")} không đủ hàng`,
        });
      } else {
        const createOrder = await Order.create({
          orderItems,
          shippingAddress: {
            fullName,
            address,
            phone,
          },
          itemsPrice,
          totalPrice,
          user,
          isPaid,
          paiAt,
          paymentMethod,
        });
        if (createOrder) {
          await EmailServices.sendEmailCreateOrder(email, orderItems);
          resolve({
            status: "OK",
            message: "success",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({ user: id }).sort({ createdAt: -1 });

      if (!order) {
        resolve({
          status: "ERROR",
          message: "không tìm thấy sản phẩm",
        });
      }

      resolve({
        status: "OK",
        message: "Lấy sản phẩm thành công",
        data: order,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailsOrder = (idOrder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const detailsOrder = await Order.findById({ _id: idOrder });

      if (!detailsOrder) {
        resolve({
          status: "ERROR",
          message: "không tìm thấy sản phẩm",
        });
      }

      resolve({
        status: "OK",
        message: "Lấy sản phẩm thành công",
        data: detailsOrder,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteDetailsOrder = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = [];
      const promises = data.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            selled: { $gte: order.amount },
          },
          {
            $inc: {
              countInStrock: +order.amount,
              selled: -order.amount,
            },
          },
          { new: true }
        );
        if (productData) {
          order = await Order.findByIdAndDelete(id);

          if (order === null) {
            resolve({
              status: "ERR",
              message: "The order is not defined",
            });
          }
        } else {
          return {
            status: "OK",
            message: "ERR",
            id: order.product,
          };
        }
      });
      const results = await Promise.all(promises);
      const newData = results && results[0] && results[0].id;
      if (newData) {
        resolve({
          status: "ERR",
          message: `Sản phẩm với id${newData.join(",")} không tồn tại`,
        });
      }
      resolve({
        status: "OK",
        message: "success",
        data: order,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const allOrder = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find();

      if (filter) {
        const searchTerm = filter.toLowerCase();
        const regexSearchTerm = new RegExp(searchTerm, "i");

        const allOrderFilter = await Order.find({
          "shippingAddress.fullName": { $regex: regexSearchTerm },
        });

        resolve({
          status: "OK",
          message: "Lấy thành công",
          data: allOrderFilter,
        });
      }

      if (!allOrder) {
        resolve({
          status: "ERROR",
          message: "Không còn tài khoản",
        });
      }

      resolve({
        status: "OK",
        message: "Lấy thành công",
        data: allOrder,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateOrder = (idUpdate, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updateOrder = await Order.findByIdAndUpdate(
        idUpdate,
        {
          trait: data.trait,
          isPaid: data.isPaid,
        },
        { new: true }
      );

      if (!updateOrder) {
        resolve({
          status: "ERR",
          message: "Không update",
        });
      }

      resolve({
        status: "OK",
        message: "Lấy thành công",
        data: updateOrder,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createOrder,
  getAllOrder,
  getDetailsOrder,
  deleteDetailsOrder,
  allOrder,
  updateOrder,
};
