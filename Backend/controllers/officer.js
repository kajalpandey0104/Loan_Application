const Loan = require("../models/Loan");

exports.getPendingLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ status: "PENDING" }).populate("customer");
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.approveLoan = async (req, res) => {
  try {
    await Loan.findByIdAndUpdate(req.params.id, { status: "APPROVED" });
    res.json({ message: "Loan approved" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.rejectLoan = async (req, res) => {
  try {
    await Loan.findByIdAndUpdate(req.params.id, { status: "REJECTED" });
    res.json({ message: "Loan rejected" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
