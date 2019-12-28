const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

//Connect to DB
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})
const db = mongoose.connection
db.once('open',() => console.log('connected to db'))

//Middleware
app.use(bodyParser.json())
app.use(cors())

//Routes
const tickets = require('./routes/tickets')
app.use('/api/tickets', tickets)

const stats = require('./routes/stats')
app.use('/api/stats',stats)

//start app
const port = 5000
app.listen(5000)