const mongoose = require('mongoose');

const patientsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    patronymic: {
        type: String,
        required: true
    },
    age: Number,
    phoneNumber: String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    region: String,
    district: String,
    address: String,
    treatmentHistory: [{
        diseaseName: String,
        amountPaid: Number,
        date: { type: Date }
    }]
});

module.exports = {
    Patients: mongoose.model('Patients', patientsSchema),
    PatientsArchive: mongoose.model('PatientsArchive', patientsSchema)
}