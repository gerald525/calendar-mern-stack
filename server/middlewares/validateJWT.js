const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No token provided"
    })
  }

  try {
    const { id, name } = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.id = id
    req.name = name;

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token"
    })
  }

  next()
}

module.exports = validateJWT;