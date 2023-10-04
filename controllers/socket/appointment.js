const Appointments = require("../../models/appointments");
const { addToPThistory } = require("./../actions/patients");

const changeState = async (id) => {
   try {
      const updatedDoc = await Appointments.findOneAndUpdate({ _id: id }, { isPending: false }, { new: true });

      const modifiedToPatientHistory = updatedDoc.selectedDiseases.map((obj) => {
         return { diseaseName: obj.diseaseName, amountPaid: obj.price, date: new Date().toISOString() }
      });
      await addToPThistory(updatedDoc.selectedPatientId, modifiedToPatientHistory);
      return updatedDoc;
   } catch (error) {
      console.log(error);
      return false;
   }
}

module.exports = {
   changeState
}