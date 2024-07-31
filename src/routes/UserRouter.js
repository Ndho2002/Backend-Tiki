const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleWare");
//lay all user
router.get("/getAll", authMiddleWare, userController.getAllUser);
//lay 1 user
router.get("/get-user/:id", authUserMiddleWare, userController.getUser);

//dang ki
router.post("/sign-up", userController.createUser);
//dang nhap
router.post("/sign-in", userController.loginUser);
//dang xuat
router.post("/log-out", userController.logoutUsers);
//updata user
router.put("/update-user/:id", authUserMiddleWare, userController.updateUser);
//delete user
router.delete("/delete-user/:id", authMiddleWare, userController.deleteUser);

//cap token moi
router.post("/refresh-token", userController.refreshToken);

//forgotPassword
router.post("/senOtp", userController.sendOtp);
router.post("/verifyOtp", userController.verifyOtp);
router.post("/updatePassword", userController.newPassword);

module.exports = router;
