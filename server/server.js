require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

// const db = require('./models/db') //Do we need it here?
const user = require('./routes/user').userRouter

app.use(cookieParser())
app.use('/api', user)


// This middleware will look for form submission headers and add the data to req.body.
// express.urlencoded() is used if the data was submitted using a traditional form.
// express.json() is used if data was submitted as json using fetch() or similar.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})