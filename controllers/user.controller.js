const bcrypt = require('bcrypt')
const { validateNewUser } = require('../validators/user.validator')
const userModel = require('../models/user.model')

const renderRegister = (req, res) => {
  res.render('register')
}
const handleRegister = async (req, res) => {
  try {
    const { email, password, firstName, lastName, address, phoneNumber } =
      req.body
    const { error, value } = validateNewUser({
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber
    })

    if (error) {
      res
        .status(400)
        .render('register', { errorMessage: 'One or more inputs is incorrect' })
      return
    }

    const existingUser = await userModel.find({ email }).exec()

    if (existingUser.length) {
      res.status(400).render('register', {
        errorMessage: 'Email already in use, use a different email ID'
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
const renderLogin = () => {}
const handleLogin = () => {}
const handleLogout = () => {}

module.exports = {
  renderRegister,
  handleRegister,
  renderLogin,
  handleLogin,
  handleLogout
}
