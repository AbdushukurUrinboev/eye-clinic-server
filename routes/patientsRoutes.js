const express = require('express');
const router = express.Router();
const patientsController = require("../controllers/patientsController");

router.get('/', patientsController.getAllPatients);
router.get('/:id', patientsController.getOnePatient);
router.post('/', patientsController.createPatients);
router.put('/:id', patientsController.updatePatients);
router.delete('/:id', patientsController.deletePatients);

module.exports = router;