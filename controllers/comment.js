const { createError } = require("../error");
const jwt = require("jsonwebtoken");
const Comment = require("../models/Comment");

exports.addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (req.user.id === comment.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted");
    } else {
      return next(createError(403, "You can delete only on your comment"));
    }
  } catch (err) {
    next(err);
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const comment = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};
