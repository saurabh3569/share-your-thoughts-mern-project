const express = require('express')
const router = express.Router()

const {CreatePost,UpdatePost,DeletePost,GetAPost,GetAllPost,MyPost,LikePost,DislikePost} = require('../controllers/post')



// create post
router.post('/',CreatePost)


// delete post
router.delete('/:id',DeletePost)


// get a post
router.get('/:id',GetAPost)


// get all post
router.get('/',GetAllPost)

// get my post
router.get('/mypost/:username',MyPost)

// like post
router.put('/like/:id',LikePost)

// dislike post
router.put('/dislike/:id',DislikePost)




module.exports = router
