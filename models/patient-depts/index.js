const mongoose = require('mongoose');


const PatientDeptsSchema = new mongoose.Schema({
   patientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patients'
   },
   patientFullName: String,
   pendingPayments: [{
      diseaseName: String,
      price: Number
   }],
   overallPrice: Number,
   date: {
      type: Date,
      default: new Date().toISOString()
   }
});

module.exports = mongoose.model('PatientDepts', PatientDeptsSchema);