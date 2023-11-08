const mongoose = require('mongoose');


const PaymentsSchema = new mongoose.Schema({
   fullName: String,
   cash: Number,
   card: Number,
   click: Number,
   date: {
      type: Date,
   }
});

PaymentsSchema.index({ date: -1 });

module.exports = mongoose.model('Payments', PaymentsSchema);