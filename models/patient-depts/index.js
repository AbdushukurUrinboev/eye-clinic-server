const mongoose = require('mongoose');

const pendingPaymentsSchema = new mongoose.Schema({
   diseaseName: String,
   price: Number
});

const treatmentCategorySchema = new mongoose.Schema({
   patientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patients'
   },
   firstName: String,
   lastName: String,
   patronymic: String,
   pendingPayments: [pendingPaymentsSchema],
   overallPrice: Number,
   phoneNumber: String
});

module.exports = mongoose.model('PatientDepts', treatmentCategorySchema);