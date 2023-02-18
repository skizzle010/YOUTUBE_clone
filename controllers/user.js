const { createError } = require("../error");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "you can only update your account"));
  }
};

exports.deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("The user has been deleted!");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only delete your account!"));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.subscribeUser = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $push: { subscribedUser: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscriber: 1 },
    });
    res.status(200).json("Subscription successful")
  } catch (err) {
    next(err);
  }
};

exports.unsubscibeUser = (req, res, next) => {};

exports.like = (req, res, next) => {};
exports.dislike = (req, res, next) => {};
