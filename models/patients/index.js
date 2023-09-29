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
    phoneNumber: Number,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    region: String,
    district: String,
    address: String,
    treatmentHistory: [String]
});

module.exports = mongoose.model('Patients', patientsSchema);