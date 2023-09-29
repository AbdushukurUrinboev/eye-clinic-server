const Patients = require("../models/patients");

const getAllPatients = async (req, res) => {
    const allPatients = await Patients.find({});
    res.send(allPatients);
}

const createPatients = async (req, res) => {
    try {
        const newPatient = new Patients(req.body);
        const savedPatient = await newPatient.save();
        res.send(savedPatient);
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            // Send a custom error response to the client
            res.status(400).send('same patient already exists');
        } else {
            res.status(500).send('Error: ' + err.message);
        }
    }
}

const updatePatients = async (req, res) => {
    try {
        const updatedPatient = await Patients.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true
        });
        res.send(updatedPatient);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
}

const deletePatients = async (req, res) => {
    const deletedPatient = await Patients.deleteOne({ _id: req.params.id });
    res.send(deletedPatient);
}


module.exports = {
    deletePatients,
    updatePatients,
    createPatients,
    getAllPatients
}