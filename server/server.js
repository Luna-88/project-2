require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

const db = require('./models/db') //Do we need it here?
const user = require('./routes/user').userRouter

app.use(cookieParser())
app.use('/api', user)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})