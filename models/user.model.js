const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'user email is required'],
    unique: true,
    minLength: 4,
    maxLength: 128,
    match: [/^\S+@\S+$/g, 'invalid email format']
    // regex - someCharacters@someOtherCharacters
  },
  passwordHash: {
    type: String,
    required: [true, 'password is required'],
    minLength: 4,
    maxLength: 128
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minLength: 4,
    maxLength: 128
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minLength: 4,
    maxLength: 128
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    minLength: 10,
    maxLength: 128
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    minLength: 7,
    maxLength: 16
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isTrade: {
    type: Boolean,
    default: false
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
