const PatientDepts = require("../models/patient-depts");
const Payments = require("../models/payments/index");

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
   const { cash, card, click } = req.body;
   try {
      const foundPTdept = await PatientDepts.findOneAndDelete({ _id: req.params.id });
      const paymentObject = {
         fullName: foundPTdept.patientFullName,
         cash,
         card,
         click,
         date: new Date().toISOString()
      }

      const newPayment = new Payments(paymentObject);
      await newPayment.save();
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