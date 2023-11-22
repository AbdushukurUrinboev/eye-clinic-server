const mongoose = require('mongoose');

const diseasesSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'developer', 'navbat'],
        required: true
    }
});

module.exports = mongoose.model('Users', diseasesSchema);
