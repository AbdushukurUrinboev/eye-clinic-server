const mongoose = require('mongoose');


const ExpensesSchema = new mongoose.Schema({
   expense: {
      type: String,
      required: true
   },
   amount: {
      type: Number,
      required: true
   },
   date: {
      type: Date
   }
});

ExpensesSchema.index({ date: -1 });

module.exports = mongoose.model('Expenses', ExpensesSchema);