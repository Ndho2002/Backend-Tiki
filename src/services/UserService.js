const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Otp = require("../models/OtpModal");
const {
  ganneralAccessToken,
  ganneralRefreshToken,
} = require("./Jwtservices.js");
const { sendEmailOtp } = require("./EmailServices.js");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "ERR",
          message: "Email đã tồn tại",
        });
      }
      const haskPassword = bcrypt.hashSync(password, 10);

      const createUser = await User.create({
        name: name,
        email: email,
        password: haskPassword,
        phone: phone,
      });
      if (createUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Email không tồn tại",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "Mật khẩu không đúng",
        });
      }
      const access_token = await ganneralAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await ganneralRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "Khong ton tai",
        });
      }

      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updateUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deteleUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "Khong ton tai",
        });
      }

      await User.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "Xóa thành công",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();

      if (!allUser) {
        resolve({
          status: "ERROR",
          message: "Không còn tài khoản",
        });
      }

      resolve({
        status: "OK",
        message: "Lấy thành công",
        data: allUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getUser = await User.findById({ _id: id });

      if (!getUser) {
        resolve({
          status: "ERROR",
          message: "không tìm thấy tài khoảng",
        });
      }

      resolve({
        status: "OK",
        message: "Lấy tài khoảng thành công",
        data: getUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const refreshTokenService = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, "refresh_token", async (err, user) => {
        if (err) {
          resolve({
            message: "không nhận được token",
            status: "ERROR",
          });
        }
        const access_token = await ganneralAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });

        resolve({
          status: "OK",
          message: "cap nhat thanh cong",
          access_token,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

const sendOtp = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkEmail = await User.findOne({
        email,
      });

      if (checkEmail === null) {
        resolve({
          status: "ERR",
          message: "Email không tồn tại",
        });
      }
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

      await sendEmailOtp(email, otp);
      const hashedOtp = await bcrypt.hashSync(otp, 10);

      const newotp = await new Otp({
        userId: checkEmail._id,
        otp: hashedOtp,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
      });
      await newotp.save();

      resolve({
        status: "OK",
        message: "Thanh công",
        data: {
          userId: checkEmail._id,
          email,
        },
      });
    } catch (error) {
      reject(error);
    }
  });
};

const verifyOtp = (id, otp) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await Otp.find({
        userId: id,
      });

      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Không tìm thấy",
        });
      }

      const { expiresAt } = checkUser[0];

      if (expiresAt < Date.now()) {
        await Otp.deleteMany({ userId: id });
      } else {
        const validOtp = await bcrypt.compareSync(otp, checkUser[0].otp);

        if (!validOtp) {
          resolve({
            status: "ERR",
            message: "Mã OTP không hợp lệ",
          });
        } else {
          await Otp.deleteMany({ userId: id });

          resolve({
            status: "OK",
            message: "Thanh công",
            data: checkUser[0].userId,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updatePassword = (id, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const haskPassword = bcrypt.hashSync(password, 10);

      const updatePassWord = await User.findByIdAndUpdate(
        id,
        { password: haskPassword },
        {
          new: true,
        }
      );

      resolve({
        status: "OK",
        message: "SUCCESS",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deteleUser,
  getAllUser,
  getUser,
  refreshTokenService,
  sendOtp,
  verifyOtp,
  updatePassword,
};
