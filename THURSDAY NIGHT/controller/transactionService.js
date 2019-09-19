
var db = require('../connection/connection')
var loginModel = require('../models/loginModel')();
var cryptography = require('../helper/cryptography');
var cacheService = require('../helper/cache')();
var authService = require('../helper/auth')();
const companyModel = require('../models/companyAccModel');
const accHandling = require('../helper/accHandling');
const userModel=require('../models/addressBook')


async function transaction(req, res) {
    const body = req.body;
    if (!accHandling.isEmpty(body)) {
      body.type = body.type.toLowerCase();
      const user = await userModel.findAl({AccountNumber: body.AccountNumber});
      if (user) {
        let toAccount;
        if (body.type === 'company') {
          toAccount = await companyModel.findAl({AccountNumber: body.toAccountNumber});
        } else if (body.type === 'user') {
          toAccount = await userModel.findAl({AccountNumber: body.toAccountNumber});
        }
        if(toAccount) {
          const withdrawData = await accHandling.withdraw(user, body.Amount);
          if (withdrawData.success) {
            const depositData = await accHandling.deposit(toAccount, body.Amount, body.type);
            if(depositData.success) {
              const receipt = await accHandling.transactionReceipt(body.AccountNumber, body.toAccountNumber, body.Amount, body.type);
              const responseData = {success: true, data: {msg: 'Transaction successful', balance: parseFloat(user.balance) - parseFloat(body.Amount)}}
              if (receipt.success) responseData.data['receipt'] = receipt.data.receipt;
              res.send(responseData);
            } else {
              res.send({success: false, error: depositData.error});
            }
          } else {
            res.send({success: false, error: withdrawData.error});
          }
        } else {
          res.send({success: false, error: 'To account does not exists'});
        }
      } else {
        res.send({success: false, error: 'User not found'});
      }
    } else {
      res.send({success: false, error: 'Please insert a body'});
    }
  }
  
  module.exports = {
    transaction
  }
  