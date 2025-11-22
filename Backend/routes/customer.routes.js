const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");

// Correct controller import
const customerController = require("../controllers/customer");

// Routes
router.post(
  "/apply-loan",
  auth,
  requireRole("CUSTOMER"),
  customerController.createLoan
);

router.get(
  "/my-loans",
  auth,
  requireRole("CUSTOMER"),
  customerController.getLoansByCustomer
);

module.exports = router;
