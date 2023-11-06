const { Patients } = require("../../models/patients");

const addToPThistory = async (pt_id, newHistory) => {
   const foundPT = await Patients.findOne({ _id: pt_id });
   if (foundPT) {
      foundPT.treatmentHistory = [...foundPT.treatmentHistory, newHistory];
      const savedPTHistory = await foundPT.save();
      return savedPTHistory;
   } else {
      return false;
   }
}

module.exports = {
   addToPThistory
}