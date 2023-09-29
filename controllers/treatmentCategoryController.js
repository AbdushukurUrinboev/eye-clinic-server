const Category = require("../models/treatmentCategory");

const getAllCategory = async (req, res) => {
   const allCategory = await Category.find({});
   res.send(allCategory);
}

const createCategory = async (req, res) => {
   try {
      const newCategory = new Category(req.body);
      const savedCategory = await newCategory.save();
      res.send(savedCategory);
   } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
         // Send a custom error response to the client
         res.status(400).send('same Category already exists');
      } else {
         res.status(500).send('Error: ' + err.message);
      }
   }
}

const updateCategory = async (req, res) => {
   try {
      const updatedCategory = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, {
         new: true
      });
      res.send(updatedCategory);
   } catch (err) {
      res.status(500).send('Error: ' + err.message);
   }
}

const deleteCategory = async (req, res) => {
   const deletedCategory = await Category.deleteOne({ _id: req.params.id });
   res.send(deletedCategory);
}


module.exports = {
   deleteCategory,
   updateCategory,
   createCategory,
   getAllCategory
}