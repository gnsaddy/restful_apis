require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 5000

let cors = require('cors')

app.use(cors()) // Use this after the variable declaration
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (err) => {
    console.log("Error: ", err)
})

db.once('open', () => {
    console.log("Database connected")
})

app.use(express.json())
const subsRouter = require('./routes/subs.js')
app.use('/subs', subsRouter)

app.use(express.static('public'));
//make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));

// app.get('/', (req, res) => {
//     res.send("Server is running...")
// })

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`)
})

