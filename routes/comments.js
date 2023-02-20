const express = require("express");
const router = express.Router();
const verifyToken = require("../routes/verifyToken");
const {
  addComment,
  deleteComment,
  getComments,
} = require("../controllers/comment");

//create a comment
router.post("/", verifyToken, addComment);

//delete a comment
router.delete("/:id", verifyToken, deleteComment);

//get a comment
router.get("/:videoId", getComments);

module.exports = router;
