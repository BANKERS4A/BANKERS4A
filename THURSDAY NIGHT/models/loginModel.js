'use strict'

const mongoose = require('mongoose');

const registeredUser = require('./addressBook');
const user = mongoose.model('registerUser')

var cryptography = require('../helper/cryptography');



module.exports = function () {
    return {
        userLoginPOST: function (obj, cb) {



            user.find({ "username": obj.username }).then(res => {
                console.log(res);
                console.log("role" + "" + res[0].role);
                if (res[0].password == obj.password && res[0].status == "approved") {

                    cb(null, res[0]);//User logged in succesfully

                } else {
                    cb(true, null);
                    console.log("heloooooo") //There was an error or the user is not found in the database
                }
            })
                .catch(err => {
                    cb(true, null);
                    console.log("hellooooooooooooooooooooooooooooooo")//There was an error or the user is not found in the database
                })
        }
    }
}
