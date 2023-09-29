const mongoose = require('mongoose');

const diseasesSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   description: String,
   price: Number,
   treatmentCategory: String
});

module.exports = mongoose.model('Diseases', diseasesSchema);