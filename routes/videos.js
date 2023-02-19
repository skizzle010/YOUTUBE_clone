const express = require("express")
const verifyToken = require("./verifyToken")
const router = express.Router()
const {addVideo, updateVideo, deleteVideo, getVideo}=require('../controllers/video')

//create a video
router.post('/:',verifyToken,addVideo)

//update a video
router.put('/:id',verifyToken,updateVideo)

//delete a video
router.delete('/:id',verifyToken,deleteVideo)

//get
router.get('/find/:id',getVideo)

//view
router.put('/view/:id',addview)

//trend
router.get('/trend/',getVideo)

//random video
router.get('/random',getVideo)



