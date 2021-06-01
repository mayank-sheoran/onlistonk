const express = require('express')
const router = express.Router()
const NewsController = require('../controller/news')

router.post('/news/likesAction',NewsController.updateLikes)
router.post('/news',NewsController.postNews)



module.exports = router