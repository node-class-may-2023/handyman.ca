const Joi = require('joi');

const validateNewServiceRequest = serviceRequest => {
  const schema = Joi.object({
    type: Joi.string().valid(
      'plumbing',
      'carpentry',
      'electrical',
      'painting',
      'general repairs'
    ),
    requestedOn: Joi.date(),
    description: Joi.string().min(30).max(512)
  });

  return schema.validate(serviceRequest);
};

module.exports = {
  validateNewServiceRequest
};
