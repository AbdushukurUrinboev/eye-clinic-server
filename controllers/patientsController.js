const { Patients, PatientsArchive } = require("../models/patients");
const { addDeptToPatient } = require("./actions/patientDepts");
const { addToPThistory } = require("./actions/patients");

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
const addPatientHistory = async (req, res) => {
    try {
        const newPTDept = {
            patientID: req.params.id,
            patientFullName: req.body.selectedPatient,
            pendingPayments: req.body.selectedDiseases,
            overallPrice: req.body.selectedPrice
        };

        const modifiedToPatientHistory = req.body.selectedDiseases.map((obj) => {
            return { diseaseName: obj.diseaseName, amountPaid: obj.price, date: new Date().toISOString() }
        });

        await addDeptToPatient(newPTDept);
        await addToPThistory(req.params.id, modifiedToPatientHistory);
        res.status(200).send('success!');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
}

const getOnePatient = async (req, res) => {
    const foundDoc = await Patients.findOne({ _id: req.params.id });
    if (foundDoc) {
        res.send(foundDoc);
    } else {
        res.status(500).send('doctor not found');
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
    try {
        const deletedPatient = await Patients.findOneAndDelete({ _id: req.params.id });

        const archivingPt = new PatientsArchive(deletedPatient._doc);
        await archivingPt.save();
        res.send(deletedPatient);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
}


module.exports = {
    deletePatients,
    updatePatients,
    createPatients,
    getAllPatients,
    getOnePatient,
    addPatientHistory
}