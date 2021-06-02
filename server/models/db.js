const mongoose = require('mongoose')

const mongoUser = 'c6dbUser'
const mongoPasswd = 'c6dbUser'
const mongoDBName = 'project2-database'
const mongoServer = 'cluster0.9q8n5.mongodb.net'
const url =
    `mongodb+srv://${mongoUser}:${mongoPasswd}` +
    `@${mongoServer}/${mongoDBName}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.once('open', (_) =>
    console.log('MongoDB is now connected:', `${mongoUser}@${mongoServer}/${mongoDBName}`)
);
db.on('error', (err) => console.error('MongoDB connection error!', err))

module.exports = mongoose