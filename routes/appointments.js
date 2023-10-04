const express = require('express');
const router = express.Router();
const appointmentsController = require("../controllers/appointmentsController");

router.get('/', appointmentsController.getAllAppointments);
router.get('/pending', appointmentsController.getAllPendingAppointments);
router.post('/', appointmentsController.createAppointments);
router.delete('/:id', appointmentsController.deleteAppointments);

module.exports = router;