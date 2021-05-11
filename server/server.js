const express = require('express')
const app = express()
const db = require('./models/db')

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})