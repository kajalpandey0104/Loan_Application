require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const loanRoutes = require('./routes/loan.routes');
const officerRoutes = require('./routes/officer.routes');
const customerRoutes = require('./routes/customer.routes');

const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/loans', loanRoutes);
app.use('/officer', officerRoutes);
app.use('/customer', customerRoutes);


app.get('/', (req, res) => res.send('Loan Origination API'));

mongoose.connect(config.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    app.listen(config.PORT, () => {
      console.log(`🚀 Server running on port ${config.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err.message);
  });
