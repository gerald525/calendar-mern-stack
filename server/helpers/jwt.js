const jwt = require("jsonwebtoken");

const generateJWT = (id, name) => {
  return new Promise((resolve, reject) => {
    const payload = { id, name };
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          console.log("JWT Generation Error", err);
          reject("Can't generate web token.");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generateJWT;
