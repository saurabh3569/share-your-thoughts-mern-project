const Post = require("../models/Post")


const CreatePost = async (req, res) => {

    const newPost = new Post({
        username: req.body.username,
        desc: req.body.desc
    })

    try {
        const post = await newPost.save()
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }

}


const DeletePost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)

        if (!post) return res.status(404).json("post not found")

        await post.deleteOne({ $set: req.body })
        res.status(200).json("post deleted successfully")


    } catch (error) {
        res.status(500).json(error)
    }



}


const GetAPost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json("post not found")

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json(error)
    }


}

const GetAllPost = async (req, res) => {

    try {
        const post = await Post.find({})
        if (!post) return res.status(404).json("post not found")

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json(error)
    }

}


const MyPost = async (req, res) => {

    try {
        const post = await Post.find({ username: req.params.username })
        if (!post) return res.status(404).json("post not found")

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json(error)
    }

}

const LikePost = async (req, res) => {

    try {
        const post = await Post.findById({ _id: req.params.id });
        if (post.dislikes.includes(req.body.username)) {
            await post.updateOne({ $pull: { dislikes: req.body.username } });
        }
        if (!post.likes.includes(req.body.username)) {
            await post.updateOne({ $push: { likes: req.body.username } });
            res.status(200).json("post has been liked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const DislikePost = async (req, res) => {
    try {
        const post = await Post.findById({ _id: req.params.id });
        if (post.likes.includes(req.body.username)) {
            await post.updateOne({ $pull: { likes: req.body.username } });
        }
        if (!post.dislikes.includes(req.body.username)) {
            await post.updateOne({ $push: { dislikes: req.body.username } });
            res.status(200).json("post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { CreatePost, DeletePost, GetAPost, GetAllPost, MyPost, LikePost, DislikePost }