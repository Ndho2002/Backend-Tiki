const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendEmailCreateOrder = async (email, orderItems) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let listItem = "";
  const attachImage = [];
  orderItems.forEach((order) => {
    listItem += `<div>
                    <div>
                        Bạn đã đặt sản phẩm <b>${order?.name}</b> với số lượng:<b>${order?.amount}</b>
                        Giá:<b>${order?.price}</b>
                    </div>
                </div>`;
    attachImage.push({ path: order.image });
  });
  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, // sender address
    to: email, // list of receivers
    subject: "Bạn đã đặt hàng tại Tiki", // Subject line
    text: "Hello world?", // plain text body
    html: `<div><b>Bạn đã đặt hàng thành công tại Tiki</b></div>${listItem}`,
    attachments: attachImage,
  });
};

const sendEmailOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, // sender address
    to: email, // list of receivers
    subject: "Mã quên mật khẩu của Tiki", // Subject line
    text: "Hello world?", // plain text body
    html: `<p>Mã otp <b>${otp}</b> để khôi phục mật khẩu</p>`,
  });
};

module.exports = {
  sendEmailCreateOrder,
  sendEmailOtp,
};
