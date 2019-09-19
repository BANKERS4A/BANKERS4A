'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('registerUser')

module.exports = function () {
    return {
        userLocked: function (obj, cb) {



            user.find({ "status": "not approved" }).then(res => {
                console.log(res);
                console.log("role" + "" + res[0].role);
                if (res.verifiedUser == true ) {

                    cb(null, res);

                } else {
                    cb(true, null);
                    console.log("heloooooo") 
                }
            })
                .catch(err => {
                    cb(true, null);
                    console.log("hellooooooooooooooooooooooooooooooo")
                })
        }
    }
}
