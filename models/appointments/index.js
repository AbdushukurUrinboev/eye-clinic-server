const mongoose = require('mongoose');

const selectedDiseasesSchema = new mongoose.Schema({
   diseaseName: String,
   price: Number
});

const appointmentsSchema = new mongoose.Schema({
   selectedPatient: {
      type: String,
      required: true
   },
   selectedDoctor: {
      type: String,
      required: true
   },
   typeOfDisease: {
      type: String,
      required: true
   },
   selectedDiseases: [selectedDiseasesSchema],
   selectedPrice: {
      type: Number,
      required: true
   }
});

module.exports = mongoose.model('Appointments', appointmentsSchema);