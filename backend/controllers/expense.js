const Expense = require("../models/ExpenseModel");
const ExpenseSchema = require("../models/ExpenseModel");
const User = require("../models/UserModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const { userId } = req.params;

  const income = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
    userId,
  });

  try {
    //validations
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }

  console.log(income);
};

exports.getExpense = async (req, res) => {
  const { userId } = req.params;
  try {
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    const expenses = await Expense.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { expenseId } = req.params;

  try {
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    await Expense.findByIdAndDelete(expenseId);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
