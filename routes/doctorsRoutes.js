const express = require('express');
const router = express.Router();
const upload = require("./../multerConfig");
const doctorsController = require("../controllers/doctorsContoller");
const { authenticateToken } = require("./../custom-middlewares/authToken");

router.get('/', authenticateToken, doctorsController.getAllDoctors);
router.get('/:id', authenticateToken, doctorsController.getDoctor);
router.post('/', authenticateToken, upload.single('avatar'), doctorsController.createDoctors);
router.post('/login', doctorsController.loginDoctor);
router.put('/:id', authenticateToken, doctorsController.updateDoctors);
router.delete('/:id', authenticateToken, doctorsController.deleteDoctors);

module.exports = router;