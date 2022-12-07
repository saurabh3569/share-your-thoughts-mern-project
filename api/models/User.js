const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true,
          },
          fullname: {
            type: String,
            require: true,
            min: 3,
            max: 20,
          },
          email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
          },
          password: {
            type: String,
            required: true,
            min: 6,
          },
          profilePicture: {
            type: String,
            default: "",
          },
          isAdmin: {
            type: Boolean,
            default: false,
          },
          followers: {
            type: Array,
            default: [],
          },
          followings: {
            type: Array,
            default: [],
          },
        },
        { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)