require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

const user = require('./routes/user').userRouter

app.use(express.urlencoded({ extended: true })) //used when submitting data using a form
app.use(express.json()) //used when submitting data as json using fetch()
app.use(cookieParser()) //used to send token to cookies
app.use('/api', user)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server listening on port: http://localhost:${port}`)
})