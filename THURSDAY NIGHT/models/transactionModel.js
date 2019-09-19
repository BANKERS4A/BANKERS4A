const mongoose = require('mongoose');
var cryptography = require('../helper/cryptography');

const transactionSchema = new mongoose.Schema({
  from: {
    type: String,
    default: false
  },
  to: {
    type: String,
    default: false
  },
  Amount: {
    type: String,
    default: false
  },
  timestamp: {
    type: String,
    default: false
  },
  type: {
    type: String,
    default: false
  }
});

let transaction = mongoose.model('transaction', transactionSchema);

exports.addTransaction = async (data) => {
  const insertData = new transaction(data);
  return await insertData.save();
} 
