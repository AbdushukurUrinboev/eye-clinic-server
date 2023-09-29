const express = require('express');
const router = express.Router();
const upload = require("./../multerConfig");
const doctorsController = require("../controllers/doctorsContoller");

router.get('/', doctorsController.getAllDoctors);
router.post('/', upload.single('avatar'), doctorsController.createDoctors);
router.put('/:id', doctorsController.updateDoctors);
router.delete('/:id', doctorsController.deleteDoctors);

module.exports = router;