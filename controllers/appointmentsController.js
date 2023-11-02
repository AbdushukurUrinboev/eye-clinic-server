const { Appointments } = require("../models/appointments");
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
   const filePath = path.join(__dirname, './../appointments.json');
   const jsonData = JSON.parse(fs.readFileSync(filePath));

   jsonData.appointments = [];
   fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
         console.error('Error writing JSON file:', err);
      }
   });
}

const getAllPendingAppointmentsForDoctor = async (req, res) => {
   const { id } = req.params;
   const allAppointments = await Appointments.find({ selectedDoctorId: id }).sort({ createdAt: -1 });
   res.send(allAppointments);

}

const addToJson = (obj) => {
   const filePath = path.join(__dirname, './../appointments.json');
   const jsonData = JSON.parse(fs.readFileSync(filePath));

   jsonData.appointments.push(obj);
   fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
         console.error('Error writing JSON file:', err);
      }
   });
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
         addToJson(savedAppointment);
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

const checkNewUpdates = (req, res) => {
   const filePath = path.join(__dirname, './../appointments.json');
   const jsonData = JSON.parse(fs.readFileSync(filePath));

   res.send(jsonData);
   jsonData.appointments = [];
   jsonData.calledAppointment = [];
   fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
         console.error('Error writing JSON file:', err);
      }
   });
}


const callPatient = async (req, res) => {
   const { appointmentId } = req.body;
   const filePath = path.join(__dirname, './../appointments.json');
   const jsonData = JSON.parse(fs.readFileSync(filePath));

   // remove from appointments if needed.
   jsonData.appointments = jsonData.appointments.filter(item => item._id !== appointmentId);

   const result = await changeState(appointmentId);
   if (result) {
      jsonData.calledAppointment.push(result);
      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
         if (err) {
            console.error('Error writing JSON file:', err);
         }
      });
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