const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const generateJWT = require("../helpers/jwt");

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

    const token = await generateJWT(user.id, user.name);

    return res.status(201).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User email does not exist",
      });
    }

    // Verify if passwords match
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        ok: false,
        msg: "Invalid password.",
      });
    }

    const token = await generateJWT(user.id, user.name);

    return res.status(200).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};

const renewToken = async (req, res) => {
  const { id, name } = req;

  const token = await generateJWT(id, name);

  res.json({ ok: true, user: { _id: id, name }, token });
};

module.exports = { createUser, loginUser, renewToken };
