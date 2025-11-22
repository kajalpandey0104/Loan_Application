const Loan = require("../models/Loan");

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
    res.status(500).json({ error: "Server error" });
  }
};

exports.getLoansByCustomer = async (req, res) => {
  try {
    const loans = await Loan.find({ customer: req.user.id });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
