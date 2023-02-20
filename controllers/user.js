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
    const user = await User.findById(req.user.id);
    if (user.subscribedUser.includes(req.params.id)) {
      res.status(403).json("You already subscribed this user");
    } else {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUser: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscriber: 1 },
      });
      res.status(200).json("subscription successful");
    }
  } catch (err) {
    next(err);
  }
};

exports.unsubscibeUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.subscribedUser.includes(req.params.id)) {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUser: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscriber: -1 },
      });
      res.status(200).json("unsubscription successful");
    } else {
      res.status(403).json("You are not subscribed this user");
    }
  } catch (err) {
    next(err);
  }
};

exports.like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The video has been liked.");
  } catch (err) {
    next(err);
  }
};

exports.dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("The video has been disliked.");
  } catch (err) {
    next(err);
  }
};
