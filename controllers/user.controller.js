const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validateNewUser } = require('../validators/user.validator')
const userModel = require('../models/user.model')

const renderRegister = (req, res) => {
  const { loggedInUser } = req
  res.render('register', { loggedInUser })
}

const handleRegister = async (req, res) => {
  try {
    const { email, password, firstName, lastName, address, phoneNumber } =
      req.body
    const { loggedInUser } = req
    const { error } = validateNewUser({
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber
    })

    if (error) {
      res.status(400).render('register', {
        errorMessage: 'One or more inputs is incorrect',
        loggedInUser
      })
      return
    }

    const existingUser = await userModel.findOne({ email }).exec()

    if (existingUser) {
      res.status(400).render('register', {
        errorMessage: 'Email already in use, use a different email ID',
        loggedInUser
      })
      return
    }

    const passwordHash = await bcrypt.hash(password, 10)

    await userModel.create({
      email,
      passwordHash,
      firstName,
      lastName,
      address,
      phoneNumber
    })

    res.render('register', {
      successMessage: 'User created successfully'
    })
  } catch (e) {
    res.status(500).send('Server Error')
  }
}

const renderLogin = (req, res) => {
  const { loggedInUser } = req
  res.render('login', loggedInUser)
}

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const { loggedInUser } = req

    if (!email || !password) {
      res.status(422).render('login', {
        errorMessage: 'email or password is incorrect',
        loggedInUser
      })
      return
    }

    const user = await userModel.findOne({ email }).exec()

    if (!user) {
      res.status(404).render('login', {
        errorMessage: 'email or password is incorrect',
        loggedInUser
      })
      return
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    if (!isValidPassword) {
      res.status(401).render('login', {
        errorMessage: 'email or password is incorrect',
        loggedInUser
      })
      return
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY
    })

    const jwtKey = process.env.JWT_KEY_NAME

    res.cookie(jwtKey, token).redirect('/service-request')
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const handleLogout = (req, res) => {
  const jwtKey = process.env.JWT_KEY_NAME
  res.cookie(jwtKey, '').redirect('/')
}

module.exports = {
  renderRegister,
  handleRegister,
  renderLogin,
  handleLogin,
  handleLogout
}
