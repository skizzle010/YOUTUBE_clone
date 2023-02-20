const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/auth");

//Create a user
router.post("/signup", signup);

//Sign in
router.post("/signin", signin);

//Google auth
router.post("/google");

module.exports = router;
