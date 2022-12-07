const mongoose = require('mongoose')

const connect = async() => {

    try {
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log("datbase connected ....");
        })
    } catch (error) {
        console.log(error);
    }

}


module.exports = connect