const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  income: { type: Number, default: 0 },
  creditScore: { type: Number, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);
