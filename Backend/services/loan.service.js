const LoanApplication = require('../models/LoanApplication');
const Customer = require('../models/Customer');
const {
  ELIGIBILITY_THRESHOLD,
  INCOME_NORM_MAX,
  CREDIT_SCORE_MIN,
  CREDIT_SCORE_MAX
} = require('../config');

/**
 * Evaluate loan eligibility
 * Formula:
 *   incomeNorm = min(income / INCOME_NORM_MAX, 1)
 *   creditScoreNorm = (creditScore - MIN) / (MAX - MIN)
 *   score = 0.6*creditScoreNorm + 0.4*incomeNorm
 * Result:
 *   status = APPROVED or REJECTED
 */
async function evaluateLoan(applicationId) {
  const app = await LoanApplication.findById(applicationId);
  if (!app) throw new Error('Loan application not found');

  const customer = await Customer.findById(app.customerId);
  if (!customer) throw new Error('Customer not found');

  // --- Income ---
  let income = Number(customer.income);
  if (isNaN(income) || income < 0) income = 0;

  const incomeNorm = Math.min(income / INCOME_NORM_MAX, 1);

  // --- Credit Score ---
  let credit = Number(customer.creditScore);
  if (isNaN(credit) || credit < CREDIT_SCORE_MIN) credit = CREDIT_SCORE_MIN;
  if (credit > CREDIT_SCORE_MAX) credit = CREDIT_SCORE_MAX;

  const creditScoreNorm =
    (credit - CREDIT_SCORE_MIN) /
    (CREDIT_SCORE_MAX - CREDIT_SCORE_MIN);

  // --- Final Score ---
  const score = (0.6 * creditScoreNorm) + (0.4 * incomeNorm);

  const finalScore = Number(score.toFixed(4));
  const threshold = Number(ELIGIBILITY_THRESHOLD);

  const status = finalScore >= threshold ? 'APPROVED' : 'REJECTED';

  // Save result
  app.eligibilityScore = finalScore;
  app.status = status;
  await app.save();

  console.log(`Loan evaluated:
   Income: ${income}
   Credit Score: ${credit}
   IncomeNorm: ${incomeNorm}
   CreditNorm: ${creditScoreNorm}
   Score: ${finalScore}
   Status: ${status}
  `);

  return {
    applicationId: app._id,
    eligibilityScore: finalScore,
    status
  };
}

module.exports = { evaluateLoan };
