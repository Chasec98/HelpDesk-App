const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const mongosession = require('connect-mongo')(session)
const verifyLogin = require('./middleware/verifyLogin')

const app = express()

//Connect to DB
mongoose.connect("mongodb+srv://user:user1234@cluster0-r6m4d.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true})
//test connection
const db = mongoose.connection
db.once('open',() => console.log('connected to db'))

//Middleware
app.use(bodyParser.json())
app.use(cors({credentials:true,origin:'http://localhost:8080'}))
app.use(session({
    name: 'session',
    secret: "asdfasdfsdfasffa",
    store: new mongosession({
      mongooseConnection: mongoose.connection
    }),
    cookie:{
      maxAge: 600000
    }
  }))
app.use(verifyLogin)
//Routes
const customers = require('./routes/customers')
app.use('/api/customers',customers);

const tickets = require('./routes/tickets')
app.use('/api/tickets', tickets)

const stats = require('./routes/stats')
app.use('/api/stats',stats)

const sessionRoute = require('./routes/session')
app.use('/api/session',sessionRoute)

const users = require('./routes/users')
app.use('/api/users',users)

const roles = require('./routes/roles')
app.use('/api/roles',roles)

//start app
const port = 5000
app.listen(5000)