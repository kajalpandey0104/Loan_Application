const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");
const officerController = require("../controllers/officer");

// Get all pending loan applications
router.get("/loans", auth, requireRole("OFFICER"), officerController.getPendingLoans);

// Approve loan
router.post("/loans/:id/approve", auth, requireRole("OFFICER"), officerController.approveLoan);

// Reject loan
router.post("/loans/:id/reject", auth, requireRole("OFFICER"), officerController.rejectLoan);

module.exports = router;
