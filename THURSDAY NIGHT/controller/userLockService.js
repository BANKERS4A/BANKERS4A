'use strict';

var db = require('../connection/connection')
var userLockedModel = require('../models/userLocked')();
var cryptography = require('../helper/cryptography');
var authService = require('../helper/auth')();


//This API checks whether user exists in database or not and return its data
module.exports.userLocked = function (req, res, next) {
   
 
    
    var user = {};

  
        userLockedModel.userLocked(user, function (err, userDetails) {
            if (err) {
               res.writeHead(401, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, data: null, message: "Invalid parameters." }));
            }
            else {
               res.writeHead(200, { 'Content-Type': 'application/json' });
             return res.end(JSON.stringify({ success: true,data: userDetails, message: 'User logged in successfully!' }));
            }
        });
    }
  





