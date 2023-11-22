const { Appointments, AppointmentsArchive } = require("../../models/appointments");
const { addToPThistory } = require("./../actions/patients");

const changeState = async (id) => {
   try {
      const updatedDoc = await Appointments.findOneAndUpdate({ _id: id }, { isPending: false, createdAt: new Date().toISOString() }, { new: true });
      const modifiedToPatientHistory = updatedDoc.selectedDiseases.map((obj) => {
         return { diseaseName: obj.diseaseName, amountPaid: obj.price, date: new Date().toISOString() }
      });
      await addToPThistory(updatedDoc.selectedPatientId, modifiedToPatientHistory);
      // archive
      
      const newArchive = new AppointmentsArchive(updatedDoc._doc);
      await newArchive.save();

      return updatedDoc;
   } catch (error) {
      console.log(error);
      return false;
   }
}

module.exports = {
   changeState
}