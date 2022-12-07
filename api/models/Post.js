const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({

      username: {
        type: String,
        require: true,
      },
      desc: {
        type: String,
        required: true,
        max: 500
      },
      likes: {
        type: Array,
        default: [],
      },
      dislikes: {
        type: Array,
        default: [],
      },
    },
    { timestamps: true },
)

module.exports = mongoose.model("Post",PostSchema)