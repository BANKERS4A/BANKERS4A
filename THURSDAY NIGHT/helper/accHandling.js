const userModel = require('../models/addressBook');
const companyMddel = require('../models/companyAccModel');
const transactionModel = require('../models/transactionModel');

async function withdraw (from, Amount) {
  const currentAmount = parseFloat(from.balance);
  if (currentAmount >= parseFloat(Amount)) {
    try {
      const newAmount = currentAmount - parseFloat(Amount);
      await userModel.update({AccountNumber: from.AccountNumber}, {balance: newAmount});
      return ({success: true, data: 'Money withdrawn successfully'});
    } catch (error) {
      return ({success: false, error: error.message});
    }
  } else {
    return ({success: false, error: 'don\'t have enough funds'});
  }
} 


async function deductFine (from, Amount) {
  const currentAmount = parseFloat(from.balance);
  if (currentAmount >= parseFloat(Amount)) {
    try {
      const newAmount = currentAmount - 100;
      await userModel.update({AccountNumber: from.AccountNumber}, {balance: newAmount});
      return ({success: true, data: 'Fine has deducted successfully'});
    } catch (error) {
      return ({success: false, error: error.message});
    }
  } else {
    return ({success: false, error: 'problem in deduction of fine'});
  }
} 



async function deposit (to, Amount, type) {
  const newAmount = parseFloat(to.balance) + parseFloat(Amount);
  if(type === 'company') {
    try {
      await companyMddel.update({AccountNumber: to.AccountNumber}, {balance: newAmount});
      return ({success: true, data: 'Money deposited to company account successfully'});
    } catch (error) {
      return ({success: false, error: error.message});
    }
  } else if (type === 'user') {
    try {
      await userModel.update({AccountNumber: to.AccountNumber}, {balance: newAmount});
      return ({success: true, data: 'Money deposited to user\'s account successfully'});
    } catch (error) {
      return ({success: false, error: error.message});
    }
  }
}

async function transactionReceipt (from, to, amount, type) {
  const date = new Date();
  const transactionData = {
    from,
    to,
    timestamp: date.toString(),
    amount,
    type
  }
  try {
    await transactionModel.addTransaction(transactionData);
    return ({success: true, data: {msg: 'Transation added successfully', receipt: transactionData}});
  } catch (error) {
    return ({success: false, error: 'Error adding transaction history'});
  }
}

function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) return false;
  }
  return true;
}

module.exports = {
  isEmpty,
  deposit,
  withdraw,
  deductFine,
  transactionReceipt
}