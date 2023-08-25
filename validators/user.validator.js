const Joi = require('joi')

const validateNewUser = user => {
  const schema = Joi.object({
    email: Joi.string().min(4).max(128).required(),
    password: Joi.string().min(4).max(128).required(),
    firstName: Joi.string().min(4).max(128).required(),
    lastName: Joi.string().min(4).max(128).required(),
    address: Joi.string().min(10).max(128).required(),
    phoneNumber: Joi.string().min(7).max(16).required()
  })

  return schema.validate(user)
}

module.exports = {
  validateNewUser
}
