const UserService = require("../services/UserService");
const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is Email",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The password is equal confirmPassword",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is Email",
      });
    }
    const response = await UserService.loginUser(req.body);
    const { refresh_token, ...newResponse } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    return res.status(200).json(newResponse);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "Không tìm thấy",
      });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "Không tìm thấy",
      });
    }
    const response = await UserService.deteleUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(200).json({
        status: "ERR",
        message: "Không tìm thấy",
      });
    }

    const response = await UserService.getUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    let token = req.headers.token.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await UserService.refreshTokenService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//log out
const logoutUsers = async (req, res) => {
  try {
    res.clearCookie("refresh-token");

    return res.status(200).json({
      status: "OK",
      message: "Đăng xuất thành công",
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isCheckEmail = reg.test(email);
    if (!email) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is Email",
      });
    }
    const response = await UserService.sendOtp(email);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { id, otp } = req.body;

    if (!otp || !id) {
      return res.status(200).json({
        status: "ERR",
        message: "Neat OTP",
      });
    }
    const response = await UserService.verifyOtp(id, otp);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const newPassword = async (req, res) => {
  try {
    const { password, confirmPassword, id } = req.body;

    if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The password is equal confirmPassword",
      });
    }
    const response = await UserService.updatePassword(id, password);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUser,
  refreshToken,
  logoutUsers,
  sendOtp,
  verifyOtp,
  newPassword,
};
