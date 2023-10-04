const express = require('express');
const router = express.Router();
const deptsController = require("../controllers/patientDeptsController");

router.get('/', deptsController.getAllPatientDepts);
router.post('/', deptsController.createPatientDepts);
router.post('/pay/:id', deptsController.payDept);
router.delete('/:id', deptsController.deletePatientDepts);

module.exports = router;