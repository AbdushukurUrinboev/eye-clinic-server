const mongoose = require('mongoose');

const diseasesSchema = new mongoose.Schema({
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
        enum: ['admin', 'viewer', 'interpreter', 'developer'],
        required: true
    }
});

module.exports = mongoose.model('Users', diseasesSchema);