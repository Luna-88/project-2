require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

const user = require('./routes/user').userRouter
const singlePlayer = require('./routes/singlePlayer').singlePlayerRouter
const inGameMenu = require('./routes/inGameMenu').inGameMenuRouter
const admin = require('./routes/admin').adminRouter

app.use(express.urlencoded({ extended: true })) //used when submitting data w/forms
app.use(express.json()) //used when submitting data as json using fetch()
app.use(cookieParser()) //used to send token to cookies

app.use('/api', user)
app.use('/api/single-player', singlePlayer)
app.use('/api/in-game-menu', inGameMenu)
app.use('/api/admin', admin)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server listening on port: http://localhost:${port}`)
})