const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const { userId } = req.params;

  // Basic validation
  if (!title || !category || !description || !date || amount <= 0) {
    return res.status(400).json({ message: "All fields are required and amount must be positive!" });
  }

  const income = new IncomeSchema({ title, amount, category, description, date, userId });

  try {
    await income.save();
    return res.status(201).json({ message: "Income added successfully", data: income });
  } catch (error) {
    console.error("Error saving income:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getIncomes = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const incomes = await IncomeSchema.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ message: "Incomes retrieved successfully", data: incomes });
  } catch (error) {
    console.error("Error retrieving incomes:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  const { incomeId } = req.params;

  try {
    const income = await IncomeSchema.findByIdAndDelete(incomeId);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    return res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error("Error deleting income:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
