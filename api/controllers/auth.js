const bcrypt = require("bcrypt");
const User = require("../models/User");

const LOGIN = async(req,res) => {

    try {
        const user = await User.findOne({username:req.body.username})

        if(!user) return res.status(404).json("user not exist")

        const validPassword = await bcrypt.compare(req.body.password,user.password)
        if(!validPassword) return res.status(400).json("wrong credentials")

        const { password, createdAt, ... other} = user._doc

        res.status(200).json(other)
        
    } catch (error) {
        res.status(500).json(error);
    }
}



const REGISTER = async(req,res) => {

    try {
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : hashedPassword
    })
    if(await User.findOne({username:newUser.username})) return res.status(403).json("user already exist");
    if(await User.findOne({email:newUser.email})) return res.status(403).json("user already exist");

    // save user
    const user = await newUser.save()
    res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json(error);
    }  
}



module.exports = {LOGIN, REGISTER}