/*
  Auth routes -> /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const fieldValidation = require("../middlewares/fieldValidation");
const router = Router();

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Invalid email").isEmail(),
    check(
      "password",
      "Password should be between 8-32 characters and should include 1 number, 1 symbol, 1 lowercase and 1 uppercase."
    ).isStrongPassword(),
    check("password", "Password should be between 8-32 characters.").isLength({
      max: 32,
    }),
    fieldValidation,
  ],
  createUser
);

router.post(
  "/login",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password is required.").not().isEmpty(),
    fieldValidation,
  ],
  loginUser
);

router.post("/renew", renewToken);

module.exports = router;
