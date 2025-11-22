const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const {
  createLoan,
  getLoansByCustomer,
} = require("../controllers/loan");

// Create Loan
router.post("/apply", auth, createLoan);

// Get customer loans
router.get("/my-loans", auth, getLoansByCustomer);

module.exports = router;
