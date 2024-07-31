const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const cookie = require("cookie-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 4040;

app.use(cors());
app.use(cookie());

app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.text({ limit: "200mb" }));

routes(app);

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connect DB success");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("server is running " + port);
});
