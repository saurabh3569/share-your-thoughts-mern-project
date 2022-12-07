const User = require("../models/User")
const bcrypt = require('bcrypt')

const GetAUser = async(req,res) => {

    try {
        const user = await User.findOne({username:req.query.username})
        if(!user) return res.status(404).json("user not found")

        const { password, updatedAt,isAdmin, ...other } = user._doc;
        res.status(200).json(other)
        
    } catch (error) {
        res.status(500).json(error)
    }


}

const FollowUser = async(req,res) => {

    if (req.body.username !== req.params.username) { 
        try { 
          const user = await User.findOne({username:req.params.username});
          const currentUser = await User.findOne({username:req.body.username});
          
          if (!user.followers.includes(req.body.username)) {
            await user.updateOne({ $push: { followers: req.body.username } });
            await currentUser.updateOne({ $push: { followings: req.params.username } });
            res.status(200).json("user has been followed");
          } else {
            res.status(403).json("you allready follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant follow yourself");
      }
      
}



const UnFollowUser = async(req,res) => {

    if (req.body.username !== req.params.username) { 
        try { 
          const user = await User.findOne({username:req.params.username});
          const currentUser = await User.findOne({username:req.body.username});
          
          if (user.followers.includes(req.body.username)) {
            await user.updateOne({ $pull: { followers: req.body.username } });
            await currentUser.updateOne({ $pull: { followings: req.params.username } });
            res.status(200).json("user has been unfollowed");
          } else {
            res.status(403).json("you allready unfollow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant unfollow yourself");
      }

}




module.exports = {GetAUser,FollowUser ,UnFollowUser}