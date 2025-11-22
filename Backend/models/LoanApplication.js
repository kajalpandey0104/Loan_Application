const mongoose = require('mongoose');
const { Schema } = mongoose;

const LoanApplicationSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  officerId: { type: Schema.Types.ObjectId, ref: 'LoanOfficer', default: null },
  amountRequested: { type: Number, required: true },
  tenureMonths: { type: Number, required: true },
  interestRate: { type: Number, default: null },
  status: { type: String, enum: ['PENDING','APPROVED','REJECTED'], default: 'PENDING' },
  eligibilityScore: { type: Number, default: null },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('LoanApplication', LoanApplicationSchema);
