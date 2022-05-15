const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ ok: false, msg: "User email already exists" });
    }
    
    user = new User(req.body);

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    return res.status(201).json({
      ok: true,
      msg: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    email,
    password,
  });
};

const renewToken = (req, res) => {
  res.json({ ok: true });
};

module.exports = { createUser, loginUser, renewToken };
