const express = require('express')
const router = express.Router()

const{ GetAUser, FollowUser ,UnFollowUser } = require('../controllers/user')


// get a user
router.get('/profile/',GetAUser)

// follow user
router.put('/follow/:username',FollowUser)

// unfollow user
router.put('/unfollow/:username',UnFollowUser)

module.exports = router