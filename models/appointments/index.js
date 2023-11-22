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
   room: {
      type: String
   },
   referencedId: String,
   createdAt: { // must store actual date
      type: Date,
      default: () => new Date().toISOString() /// neeed to fix date
   }
});

const ArchiveSchema = new mongoose.Schema({
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
   createdAt: {
      type: Date,
   }
});

appointmentsSchema.index({ createdAt: -1 });
ArchiveSchema.index({ createdAt: -1 });

module.exports = {
   Appointments: mongoose.model('Appointments', appointmentsSchema),
   AppointmentsArchive: mongoose.model('AppointmentsArchive', ArchiveSchema),
   AppointmentsQueue: mongoose.model('AppointmentsQueue', appointmentsSchema),
   CalledAppointmentsQueue: mongoose.model('CalledAppointmentsQueue', appointmentsSchema),
}