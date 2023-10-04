const Appointments = require("../models/appointments");
const { addDeptToPatient } = require("./actions/patientDepts")

const getAllAppointments = async (req, res) => {
   const allAppointments = await Appointments.find({}).sort({ createdAt: -1 });
   res.send(allAppointments);
}

const getAllPendingAppointments = async (req, res) => {
   const allAppointments = await Appointments.find({ isPending: true }).sort({ createdAt: -1 });
   res.send(allAppointments);
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
         const newAppointment = new Appointments(req.body);
         const savedAppointment = await newAppointment.save();
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


module.exports = {
   deleteAppointments,
   createAppointments,
   getAllAppointments,
   getAllPendingAppointments
}