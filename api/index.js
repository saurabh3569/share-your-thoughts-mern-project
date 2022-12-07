const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connect = require('./db/db')
const auth = require('./routes/auth')
const post = require('./routes/post')
const user = require('./routes/user')

const app = express()
app.use(express.json())
dotenv.config()
app.use(cors())



app.use('/api/auth',auth)
app.use('/api/post',post)
app.use('/api/user',user)


const PORT = process.env.PORT

app.listen(PORT,()=>{
    connect()
    console.log("server  started")
})