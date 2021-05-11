const mongoose = require('mongoose')

const mongoUser = 'c6dbUser'
const mongoPasswd = 'c6dbUser'
const mongoDBName = 'project2-database'
const mongoServer = 'cluster0.9q8n5.mongodb.net'
const url =
    `mongodb+srv://${mongoUser}:${mongoPasswd}` +
    `@${mongoServer}/${mongoDBName}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// .then(() => console.log('Connected to MongoDB Atlas...'))
// .catch(err => console.error('Could not connect to MongoDB Atlas...', err))

// Taking Tony Grimes' advice and using Greg's way of coding this MongoDB connection algorithm
const db = mongoose.connection
db.once('open', (_) =>
    console.log('MongoDB is now connected:', `${mongoUser}@${mongoServer}/${mongoDBName}`)
);
db.on('error', (err) => console.error('MongoDB connection error!', err))

module.exports = mongoose