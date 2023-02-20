const { createError } = require("../error");
const jwt = require("jsonwebtoken");
const Video = require("../models/Video");
const User = require("../models/User");

exports.addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

exports.updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(createError(404, "Video not found!!"));
    }
    if (req.user.id == video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can only update your video!"));
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(createError(404, "Video not found!!"));
    }
    if (req.user.id == video.userId) {
      const updatedVideo = await Video.findByIdAnddelete(req.params.id);
      res.status(200).json("The video has been deleted");
    } else {
      return next(createError(403, "You can only delete your video!"));
    }
  } catch (err) {
    next(err);
  }
};

exports.getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(this.getVideo);
  } catch (err) {
    next(err);
  }
};

exports.addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { view: 1 },
    });
    res.status(200).json("The view has been increased");
  } catch (err) {
    next(err);
  }
};

exports.random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

exports.trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ view: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

exports.sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUser;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

exports.getByTags = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

exports.getall = async (req, res, next) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
