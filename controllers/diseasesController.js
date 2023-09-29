const Diseases = require("../models/diseases");

const getAllDiseases = async (req, res) => {
   const allDiseases = await Diseases.find({});
   res.send(allDiseases);
}

const createDiseases = async (req, res) => {
   try {
      const newDisease = new Diseases(req.body);
      const savedDisease = await newDisease.save();
      res.send(savedDisease);
   } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
         // Send a custom error response to the client
         res.status(400).send('same Disease already exists');
      } else {
         res.status(500).send('Error: ' + err.message);
      }
   }
}

const updateDiseases = async (req, res) => {
   try {
      const updatedDisease = await Diseases.findOneAndUpdate({ _id: req.params.id }, req.body, {
         new: true
      });
      res.send(updatedDisease);
   } catch (err) {
      res.status(500).send('Error: ' + err.message);
   }
}

const deleteDiseases = async (req, res) => {
   const deletedDisease = await Diseases.deleteOne({ _id: req.params.id });
   res.send(deletedDisease);
}


module.exports = {
   deleteDiseases,
   updateDiseases,
   createDiseases,
   getAllDiseases
}