const express = require('express');
const router = express.Router();
const diseasesController = require("../controllers/diseasesController");

router.get('/', diseasesController.getAllDiseases);
router.post('/', diseasesController.createDiseases);
router.put('/:id', diseasesController.updateDiseases);
router.delete('/:id', diseasesController.deleteDiseases);

module.exports = router;