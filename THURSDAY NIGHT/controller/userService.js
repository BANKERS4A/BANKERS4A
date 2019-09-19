'use strict';

var db = require('../connection/connection')
var loginModel = require('../models/loginModel')();
var cryptography = require('../helper/cryptography');
var cacheService = require('../helper/cache')();
var authService = require('../helper/auth')();
const companyModel = require('../models/companyAccModel');
const accHandling = require('../helper/accHandling');
const userModel=require('../models/addressBook')

//This API checks whether user exists in database or not and return its data
module.exports.userLoginPOST = function (req, res, next) {
    // var validator = require("email-validator");

    res.setHeader('Content-Type', 'application/json');
    var _params = req.swagger.params;
    
    var user = {
        username:"",
        password:""
        
    };

    if (_params.username.value) {
        // if (validator.validate(_params.email.value))
            user.username = _params.username.value.toLowerCase();
    }
    console.log(user.username);

    if (_params.password.value)
        user.password = cryptography.sha256(_params.password.value);
console.log(user.password);
    if (_params.username.value && _params.password.value) {
        loginModel.userLoginPOST(user, function (err, userDetails) {
            if (err) {
                console.log("err"+err);
                res.writeHead(401, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, data: null, message: "Invalid parameters." }));
            }
            else {
                //Here we have successful login. Now store the token in cache.
                console.log("ankita"+userDetails.username);
                var token = authService.issueToken(userDetails.username, userDetails.password);
                console.log(token);
                console.log("milind"+userDetails.username);
                res.setHeader("authToken", token);
                console.log(err);
                console.log("shreyas"+userDetails.username);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                
                return res.end(JSON.stringify({ success: true, token,data: userDetails, message: 'User logged in successfully!' }));
            }
        });
    }
    else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, data: null, message: "Invalid parameters." }));
    }
}




