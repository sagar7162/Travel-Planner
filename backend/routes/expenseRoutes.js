const express = require("express");
const router = express.Router();
const {editExpense} = require('../controllers/expenseController');


router.put('/trip/:id/editexpense', editExpense);

module.exports = router;