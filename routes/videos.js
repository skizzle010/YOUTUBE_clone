const express = require("express");
const verifyToken = require("./verifyToken");
const router = express.Router();
const {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  trend,
  random,
  sub,
  getByTags,
  getall,
  search,
} = require("../controllers/video");

//create a video
router.post("/", verifyToken, addVideo);

//update a video
router.put("/:id", verifyToken, updateVideo);

//delete a video
router.delete("/:id", verifyToken, deleteVideo);

//get
router.get("/find/:id", getVideo);

//view
router.put("/view/:id", addView);

//trend
router.get("/trend/", trend);

//random video
router.get("/random", random);

//sub video
router.get("/sub", verifyToken, sub);

//get video by tags
router.get("/tags", getByTags);

//get all
router.get("/", getall);

//get video by search
router.get("/search", search);

module.exports = router;
