const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");

const router = require("express").Router();

router
  .post("/incomes/:userId", addIncome)
  .get("/incomes/:userId", getIncomes)
  .delete("/incomes/:incomeId", deleteIncome)
  .post("/expenses/:userId", addExpense)
  .get("/expenses/:userId", getExpense)
  .delete("/expenses/:expenseId", deleteExpense);

module.exports = router;
