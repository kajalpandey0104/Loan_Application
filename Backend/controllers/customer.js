const Loan = require("../models/Loan");

// Customer Profile
exports.getProfile = async (req, res) => {
  res.json({ user: req.user });
};

// Apply for a loan
exports.createLoan = async (req, res) => {
  try {
    const loan = new Loan({
      customer: req.user.id,
      amountRequested: req.body.amountRequested,
      tenureMonths: req.body.tenureMonths,
      status: "PENDING",
    });

    await loan.save();
    res.json({ message: "Loan application submitted", loan });
  } catch (err) {
    console.error("Error creating loan:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get customer loan list
exports.getLoansByCustomer = async (req, res) => {
  try {
    const loans = await Loan.find({ customer: req.user.id });
    res.json(loans);
  } catch (err) {
    console.error("Error fetching customer loans:", err);
    res.status(500).json({ error: "Server error" });
  }
};
