const express = require('express')
const router = express.Router()
const LearningController = require('../controller/learning')

router.post('/addbook',LearningController.postAddBook)
router.post('/getbooks',LearningController.postRetrieveBooks)

router.post('/addvideo',LearningController.postAddVideo)
router.post('/getvideos',LearningController.postRetrieveVideos)

module.exports = router