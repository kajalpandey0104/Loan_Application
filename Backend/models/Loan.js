const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amountRequested: {
      type: Number,
      required: true,
    },
    tenureMonths: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    officerComments: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loan", LoanSchema);
