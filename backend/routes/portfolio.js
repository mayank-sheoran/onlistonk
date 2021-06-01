const express = require('express')
const router = express.Router()
const PortfolioController = require('../controller/portfolio')

router.post('/addREINFO',PortfolioController.saveRE)
router.post('/fetchREINFO',PortfolioController.fetchRE)
router.post('/addWL',PortfolioController.addWL)
router.post('/fetchWL',PortfolioController.fetchWL)
module.exports = router