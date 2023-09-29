const mongoose = require('mongoose');

const treatmentCategorySchema = new mongoose.Schema({
   categoryName: String
});

module.exports = mongoose.model('TreatmentCategory', treatmentCategorySchema);