const express = require("express");
const router = express.Router();
const {
  update,
  deleteUser,
  getUser,
  subscribeUser,
  unsubscibeUser,
  like,
  dislike,
} = require("../controllers/user");
const verifyToken = require("../routes/verifyToken");

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get user
router.get("/find/:id", getUser);

//subscribe
router.put("/sub/:id", verifyToken, subscribeUser);

//unsubscribe
router.put("/unsub/:id", verifyToken, unsubscibeUser);

//like
router.put("/like/:videoId", verifyToken, like);

//dislike
router.put("/dislike/:videoId", verifyToken, dislike);

module.exports = router;
