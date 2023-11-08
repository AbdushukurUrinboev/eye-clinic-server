const express = require('express');
const router = express.Router();
const PaymentsController = require("../controllers/archives/payments");

router.post('/profits', PaymentsController.getPayments);
router.post('/expenses', PaymentsController.getExpenses);
router.post('/expenses/add', PaymentsController.addExpense);

module.exports = router;