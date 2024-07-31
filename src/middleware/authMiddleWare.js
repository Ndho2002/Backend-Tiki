const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  const token = req?.headers?.token?.split(" ")[1];

  jwt.verify(token, "access_token", function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "Phai la admin",
        status: "ERROR",
      });
    }

    if (user?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "Phai la admin ",
        status: "ERROR",
      });
    }
  });
};

const authUserMiddleWare = (req, res, next) => {
  if (req.headers && req.headers["token"]) {
    const token = req.headers.token.split(" ")[1];
    jwt.verify(token, "access_token", function (err, user) {
      if (err)
        return res.status(401).json({
          success: false,
          mes: "Invalid access token",
        });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      mes: "Require authentication!!!",
    });
  }
};

module.exports = {
  authMiddleWare,
  authUserMiddleWare,
};
