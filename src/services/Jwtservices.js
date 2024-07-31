const jwt = require("jsonwebtoken");

const ganneralAccessToken = async (payloat) => {
  const accessToken = jwt.sign(
    {
      ...payloat,
    },
    "access_token",
    { expiresIn: "1h" }
  );
  return accessToken;
};

const ganneralRefreshToken = async (payloat) => {
  const accessToken = jwt.sign(
    {
      ...payloat,
    },
    "refresh_token",
    { expiresIn: "365d" }
  );
  return accessToken;
};
module.exports = {
  ganneralAccessToken,
  ganneralRefreshToken,
};
