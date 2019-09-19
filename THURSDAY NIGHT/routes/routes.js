var express = require('express');
const mongoose = require('mongoose')
var router = express.Router();
var cryptography = require('../helper/cryptography');
const contactCtrl = require('../controller/contactCtrl');
const chequeCtrl=require('../controller/checkController');
const userfind = mongoose.model('registerUser')
var user = require('../controller/transactionService');
var adminController = require('../controller/adminController');

var contactus = require("../controller/contactUs");
var admin = require("../models/loginModel");



var chequeUser = require('../models/chequeModel');
var cheque=mongoose.model('chequeUser')

/***CHEQUE API */
router.post("/cheque/Application", (req, res) => {
    
    var ad = new cheque({
        chequeNo: req.body.chequeNo,
        Amount: req.body.Amount,
        account: req.body.account,
        AccountNumber: req.body.AccountNumber,
        username:req.body.username,
    });
    ad.save((err, doc) => {
        if (!err) {
            res.send(doc);
            console.log(req.body);
        } else {
            console.log(
                "Error in  Save :" + JSON.stringify(err, undefined, 2)
            );
        }
    });

});

    
    


router.get("/cheque/Application", (req, res) => {
    
    cheque.find((err, doc) => {
        if (!err) {
            res.send(doc);
            // console.log(req.body);
        } else {
            console.log(
                "Error in  Save :" + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.get('/user/ministatement/:email', contactCtrl.ministatement);



router.get('/user/chequeStatus/:id', chequeCtrl.chequeOne);

//to update user cheque state from not received to received
router.put('/cheque/:AccountNumber', chequeCtrl.update);


//to update user cheque state from received to sent for clearence
router.put('/cheque/clearence/:AccountNumber', chequeCtrl.stateClear);

//to update user cheque state from  sent for clearence to cleared
router.put('/cheque/cleared/:AccountNumber', chequeCtrl.cleared);

//to update user cheque state from  sent for clearence to bounce
router.put('/cheque/bounced/:AccountNumber', chequeCtrl.bounced);

//to add the amount mentioned in cheque  in the account after clearenec
router.put('/user/addAmountByCheque/:AccountNumber', adminController.deposit);

//deduct fine of 100rupees after cheque bounce
router.put('/user/deductFine/:AccountNumber', adminController.deductFine);

/***CHEQUE API END*/

/***ADMIN REGISTRATION  FOR GETTING ALL THE USERS WHO ARE NOT APPROVED*/
router.get("/user/notApproved", (req, res) => {
    userfind.find({ "status": "not approved" }).sort({ username: 1 }).then(res1 => {

        // cb(null, res[0]);
        res.send(res1);
        console.log(res1);
    }).catch(err => {
        cb(true, null);//There was an error or the user is not found in the database
    });
});


router.get("/user-one/notApproved", (req, res) => {
    userfind.findOne({ "status": "not approved" }).sort({ username: 1 }).then(res1 => {

        // cb(null, res[0]);
        res.send(res1);
        console.log(res1);
    }).catch(err => {
        cb(true, null);//There was an error or the user is not found in the database
    });
});

















// ContactUs  customer api router
router.post('/contactUs', function (req, res) {
    contactus.save(req, res);
});

router.get('/contactUs', function (req, res) {
    contactus.list(req, res);
});





//approve user by admin //add account number 
router.put('/user/:email', adminController.update);
//when reject the application
router.delete('/user/:email', contactCtrl.remove);
//change status from approved to not approved to stop user from logging
router.put('/notApprove/:email', contactCtrl.statusChange);

// //get all the users whose account has been locked
// router.get('/user/locked', contactCtrl.findLockedUsers);

//unlock account by admin manually
router.put('/Approve/:email', contactCtrl.statusChangeByAdmin);


router.get('/register', contactCtrl.get);


router.get('/register/:id', contactCtrl.getOne);

router.post('/register', contactCtrl.create);

router.put('/register/:email', contactCtrl.update);

router.delete('/register/:email', contactCtrl.remove);



//TRANSACTION
router.post('/user/transaction', user.transaction);
router.post('/admin/deposit', adminController.deposit);
router.post('/admin/withdraw', adminController.withdraw);







module.exports = router;
