const PatientDepts = require("../models/patient-depts");
const getAllPatientDepts = async (req, res) => {
   const allPatientDepts = await PatientDepts.find({});
   res.send(allPatientDepts);
}

const createPatientDepts = async (req, res) => {
   try {
      const newDept = new PatientDepts(req.body);
      const savedDept = await newDept.save();
      res.send(savedDept);
   } catch (err) {
      res.status(500).send('Error: ' + err.message);
   }
}

const payDept = async (req, res) => {
   try {
      const foundPTdept = await PatientDepts.deleteOne({ _id: req.params.id });
      res.send(foundPTdept);
   } catch (err) {
      res.status(500).send('Error: ' + err.message);
   }
}
const deletePatientDepts = async (req, res) => {
   const deletedDept = await PatientDepts.deleteOne({ _id: req.params.id });
   res.send(deletedDept);
}


module.exports = {
   deletePatientDepts,
   createPatientDepts,
   getAllPatientDepts,
   payDept
}