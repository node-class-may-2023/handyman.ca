require('dotenv').config()
require('./db')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const { auth } = require('./middleware/auth')

const {
  renderRegister,
  handleRegister,
  renderLogin,
  handleLogin,
  handleLogout
} = require('./controllers/user.controller')

const app = express()
const PORT = process.env.PORT

app.set('view engine', 'ejs')
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/register', renderRegister)
app.post('/register', handleRegister)

app.get('/login', renderLogin)
app.post('/login', handleLogin)

app.get('/logout', handleLogout)

app.use(auth)

app.get('/service-request', (req, res) => {
  const { loggedInUser } = req
  res.render('service-request', { loggedInUser })
})

app.get('*', (req, res) => {
  res.status(404).send('Not Found')
})

mongoose.connection.once('open', () => {
  console.log('DB connection established')
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
  })
})
