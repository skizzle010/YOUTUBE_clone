const express = require("express");
const router = express.Router();
const {signup,signin}=require("../controllers/user")

//Create a user
router.post('/signup',signup)

//Sign in
router.post('/signin',signin)

//Google auth
router.post('/google',)

module.exports = router;