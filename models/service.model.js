const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['plumbing', 'carpentry', 'electrical', 'painting', 'general repairs']
  },
  description: {
    type: String,
    minLength: 30,
    maxLength: 512
  },
  status: {
    type: String,
    enum: ['created', 'completed', 'in progress', 'cancelled'],
    default: 'created'
  },
  cost: {
    type: Number,
    default: 0
  },
  requestedOn: {
    type: Date,
    required: [true, 'service date is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service
