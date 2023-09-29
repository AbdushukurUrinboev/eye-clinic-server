const Doctors = require("../models/doctors");

const getAllDoctors = async (req, res) => {
   const allDoctors = await Doctors.find({});
   res.send(allDoctors);
}

const createDoctors = async (req, res) => {
   try {
      const newDoctor = new Doctors({ ...req.body, avatar: req.file ? `/uploads/doctors/${req.file.filename}` : 'none' });
      const savedDoctor = await newDoctor.save();
      res.send(savedDoctor);
   } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
         // Send a custom error response to the client
         res.status(400).send('same Doctor already exists');
      } else {
         res.status(500).send('Error: ' + err.message);
      }
   }
}

const updateDoctors = async (req, res) => {
   try {
      const updatedDoctor = await Doctors.findOneAndUpdate({ _id: req.params.id }, req.body, {
         new: true
      });
      res.send(updatedDoctor);
   } catch (err) {
      res.status(500).send('Error: ' + err.message);
   }
}

const deleteDoctors = async (req, res) => {
   const deletedDoctor = await Doctors.deleteOne({ _id: req.params.id });
   res.send(deletedDoctor);
}


module.exports = {
   deleteDoctors,
   updateDoctors,
   createDoctors,
   getAllDoctors
}