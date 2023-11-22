const Doctors = require("../models/doctors");
const { Appointments, AppointmentsQueue, CalledAppointmentsQueue } = require("../models/appointments");
const { addDeptToPatient } = require("./actions/patientDepts");
const path = require('path');
const fs = require('fs');
const { changeState } = require("./socket/appointment");

const getAllAppointments = async (req, res) => {
   const allAppointments = await Appointments.find({}).sort({ createdAt: -1 });
   res.send(allAppointments);
}

const getAllPendingAppointments = async (req, res) => {
   const allAppointments = await Appointments.find({}).sort({ createdAt: -1 });
   res.send(allAppointments);

   // clear appointments
   await AppointmentsQueue.deleteMany({});
}

const getAllPendingAppointmentsForDoctor = async (req, res) => {
   const { id } = req.params;
   const allAppointments = await Appointments.find({ selectedDoctorId: id }).sort({ createdAt: -1 });
   res.send(allAppointments);

}

const addToJson = async (obj) => {
   const refId = obj._id
   obj._id = undefined;
   const newAppointmentQueue = new AppointmentsQueue({ ...obj, referencedId: refId });
   await newAppointmentQueue.save();
}

const createAppointments = async (req, res) => {
   try {
      // dept obj
      const newPTDept = {
         patientID: req.body.selectedPatientId,
         patientFullName: req.body.selectedPatient,
         pendingPayments: req.body.selectedDiseases,
         overallPrice: req.body.selectedPrice
      };
      // adding depts
      const savedDeptResponse = await addDeptToPatient(newPTDept);

      if (savedDeptResponse) {
         const newAppointment = new Appointments({ ...req.body, createdAt: new Date().toISOString() });
         const savedAppointment = await newAppointment.save();
         await addToJson(savedAppointment._doc);
         res.send(savedAppointment);
      } else {
         res.status(500).send('Error!');
      }

   } catch (err) {
      res.status(500).send('Error: ' + err.message);
   }
}

const deleteAppointments = async (req, res) => {
   const deletedAppointment = await Appointments.deleteOne({ _id: req.params.id });
   res.send(deletedAppointment);
}

// order handlers

const checkNewUpdates = async (req, res) => {
   const prevQueues = await AppointmentsQueue.find({});
   const calledPrevQueues = await CalledAppointmentsQueue.find({});
   console.log(calledPrevQueues);
   if(prevQueues.length > 0) {
      await AppointmentsQueue.deleteMany({});
   }
   if(calledPrevQueues.length > 0) {
      await CalledAppointmentsQueue.deleteMany({});
   }
   const edittedQueue = prevQueues.map((queue) => {
      return { ...queue._doc, _id: queue.referencedId }
   });
   const edittedCalledQueue = calledPrevQueues.map((queue) => {
      return { ...queue._doc, _id: queue.referencedId }
   });
   res.send({
      appointments: edittedQueue,
      calledAppointment: edittedCalledQueue
   });
}


const callPatient = async (req, res) => {
   const { appointmentId } = req.body;
   // remove from appointments if needed.
   await AppointmentsQueue.deleteOne({ referencedId: appointmentId });

   const result = await changeState(appointmentId);
   if (result) {
      const refId = result._doc._id;   
      const doctor = await Doctors.findOne({_id: result._doc.selectedDoctorId});
      result._doc._id = undefined;      
      const newCalledAppointmentQueue = new CalledAppointmentsQueue({ ...result._doc, referencedId: refId, room: doctor.roomNumber });
      await newCalledAppointmentQueue.save();
      res.send("patient called");
   } else {
      res.status(500).send('Error: ' + "error updating appointment state");
   }
}


module.exports = {
   deleteAppointments,
   createAppointments,
   getAllAppointments,
   getAllPendingAppointments,
   checkNewUpdates,
   callPatient,
   getAllPendingAppointmentsForDoctor
}