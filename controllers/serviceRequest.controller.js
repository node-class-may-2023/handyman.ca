const {
  validateNewServiceRequest
} = require('../validators/serviceRequest.validator');

const serviceModel = require('../models/service.model');

const renderServiceRequest = (req, res) => {
  const { loggedInUser } = req;
  res.render('service-request', { loggedInUser });
};

const handleServiceRequest = async (req, res) => {
  try {
    const { loggedInUser } = req;

    const {
      serviceType: type,
      serviceDate: requestedOn,
      serviceDescription: description
    } = req.body;

    const { error, value } = validateNewServiceRequest({
      type,
      requestedOn,
      description
    });

    if (error) {
      res.status(400).render('service-request', {
        loggedInUser,
        errorMessage: `Invalid Form Field(s) ${error}`
      });
      return;
    }

    const user = req?.loggedInUser?._id;

    await serviceModel.create({ ...value, user });

    res.render('successful-request');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const renderAdminDashboard = async (req, res) => {
  try {
    // read all service requests from DB
    const serviceRequests = await serviceModel.find().populate('user').exec();

    res.render('admin', { serviceRequests });
  } catch (err) {
    res.status(500).send('server error');
  }
};

module.exports = {
  renderServiceRequest,
  handleServiceRequest,
  renderAdminDashboard
};
