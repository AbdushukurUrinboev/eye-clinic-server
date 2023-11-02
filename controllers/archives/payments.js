const Payments = require("../../models/payments");
const Expenses = require("../../models/expenses");

const getPayments = async (req, res) => {
   const { startDate, endDate } = req.body;
   try {
      const paymentsResult = await Payments.find({
         date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
         }
      }).sort({ date: -1 });
      res.send(paymentsResult);
   } catch (error) {
      // Handle error appropriately, e.g., send an error response
      console.error(error);
      res.status(500).send("Internal Server Error");
   }
}

const getExpenses = async (req, res) => {
   const { startDate, endDate } = req.body;
   try {
      const expensesResult = await Expenses.find({
         date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
         }
      }).sort({ date: -1 });
      res.send(expensesResult);
   } catch (error) {
      // Handle error appropriately, e.g., send an error response
      console.error(error);
      res.status(500).send("Internal Server Error");
   }
}

const addExpense = async (req, res) => {
   try {
      const newExpense = new Expenses({ ...req.body, date: new Date().toISOString() });
      await newExpense.save();

      res.send(newExpense);
   } catch (error) {
      // Handle error appropriately, e.g., send an error response
      console.error(error);
      res.status(500).send("Internal Server Error");
   }
}

module.exports = {
   getPayments,
   getExpenses,
   addExpense
}