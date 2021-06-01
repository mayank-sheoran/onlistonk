const express = require('express')
const router = express.Router()
const RegisterController = require('../controller/register')

router.post('/register/check-username',RegisterController.postCheckUsername)
router.post('/register',RegisterController.postRegister)

module.exports = router