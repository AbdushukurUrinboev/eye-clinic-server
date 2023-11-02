const PatientDepts = require("../../models/patient-depts");

const addDeptToPatient = async (newDeptsData) => {
   try {
      const existingPatientDept = await PatientDepts.findOne({ patientID: newDeptsData.patientID });
      if (!existingPatientDept) {
         const newDept = new PatientDepts({ ...newDeptsData, date: new Date().toISOString() });
         const savedDept = await newDept.save();
         return savedDept;
      } else {
         existingPatientDept.pendingPayments = [...existingPatientDept.pendingPayments, ...newDeptsData.pendingPayments];
         existingPatientDept.overallPrice += newDeptsData.overallPrice;
         const updatedPTDept = await existingPatientDept.save();
         return updatedPTDept;
      }
   } catch (err) {
      console.log(err);
      return false;
   }
}


module.exports = {
   addDeptToPatient
}