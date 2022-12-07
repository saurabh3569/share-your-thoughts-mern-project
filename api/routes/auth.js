const express = require('express')
const router = express.Router()
const {LOGIN,REGISTER} = require('../controllers/auth')


router.post('/login',LOGIN)

router.post('/register',REGISTER)




module.exports = router