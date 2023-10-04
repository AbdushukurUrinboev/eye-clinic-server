const mongoose = require('mongoose');


const appointmentsSchema = new mongoose.Schema({
   selectedPatientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patients',
      required: true
   },
   selectedDoctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctors',
      required: true
   },
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
   selectedDiseases: [{
      diseaseName: String,
      price: Number
   }],
   selectedPrice: {
      type: Number,
      required: true
   },
   isPending: {
      type: Boolean,
      default: true
   },
   createdAt: { // must store actual date
      type: Date,
      default: new Date().toISOString()
   }
});

appointmentsSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Appointments', appointmentsSchema);