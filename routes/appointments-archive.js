const express = require('express');
const router = express.Router();
const appointmentsController = require("../controllers/archives/appointments");

router.post('/', appointmentsController.getAllAppointments);

module.exports = router;