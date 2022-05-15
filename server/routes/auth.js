/*
  Auth routes -> /api/auth
*/

const { Router } = require("express");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const router = Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/renew", renewToken);

module.exports = router;
