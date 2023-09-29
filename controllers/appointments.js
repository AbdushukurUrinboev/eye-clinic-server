const Appointments = require("../models/appointments");

const getAllAppointments = async (req, res) => {
   const allAppointments = await Appointments.find({});
   res.send(allAppointments);
}

const createAppointments = async (req, res) => {
   try {
      const newAppointment = new Appointments(req.body);
      const savedAppointment = await newAppointment.save();
      res.send(savedAppointment);
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
   getAllAppointments
}