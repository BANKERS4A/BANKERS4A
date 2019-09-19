const mongoose = require('mongoose');
var cryptography = require('../helper/cryptography');
var uniqueValidator = require('mongoose-unique-validator');
const newLocal = /@gmail\.com$/;
const registerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true
    },

    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: true
    },
    address3: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true,

    },
    phone: {
        type: Number,
        required: true,

    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        $regex: newLocal
    },
    password: {
        type: String,
        required: true
    },
    role:
    {
        type: String,

        default: 'user',

        value: ['user', 'admin']
    },
    status: {
        type: String,
        default: 'not approved',
        value: ['approved', 'not approved']
    },
    verifiedUser: {
        type: Boolean,
        default: false
    },
    AccountNumber: {
        type: String,
        default: null
    },
    balance: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,

        default: Date.now
    }

    //    AccountDetails:[account,AccountNumber]


});

let registerUser = mongoose.model('registerUser', registerSchema);
registerSchema.plugin(uniqueValidator);

exports.findAll = (data) => {
    return new Promise((resolve, reject) => {
        registerUser.find(data)
            .then((res) => {
                return resolve(res)
            })
            .catch((err) => {
                let badResponse = {
                    message: "Data Not Found",
                    error: err
                }
                return reject(badResponse)
            })
    })
}

exports.findAl = (data) => {
    return new Promise((resolve, reject) => {
        registerUser.findOne(data)
            .then((res) => {
                return resolve(res)
            })
            .catch((err) => {
                let badResponse = {
                    message: "Data Not Found",
                    error: err
                }
                return reject(badResponse)
            })
    })
}


//to get all the users whose account has been locked
// exports.lockuser = (data) => {
//     return new Promise((resolve, reject) => {

  
//         registerUser.find( { "verifiedUser":true })
//             .then(res => {
//                 console.log("before"+res)
//                    if(res.status=="not approved")
//                    console.log("after")
//                       return resolve(res)
//             })
//             .catch((err) => {
//                 let badResponse = {
//                     message: "Data Not Found",
//                     error: err
//                 }
//                 return reject(badResponse)
//             })
//     })
// }



exports.insertData = (data) => {
    return new Promise((resolve, reject) => {
        var insertData = new registerUser(data)
        if (insertData.password)
            insertData.password = cryptography.sha256(insertData.password);

        return insertData.save()
            .then((res) => {
                if (res) {
                    return resolve(res)
                } else {
                    let badResponse = {
                        msg: "Data Not Inserted"
                    }
                    return reject(badResponse)
                }
            })
            .catch((err) => {
                let badResponse = {
                    msg: "Data Not Inserted",
                    error: err
                }
                return reject(badResponse)
            })
    })
}




//for admin dashboard to approve user
exports.updateData = (toUpdate, data) => {
    return new Promise((resolve, reject) => {
        const prefix = 'AC';
        var accountNumber = Math.floor(Math.random() * 100000000000000) + 99999999999999;
        var customerAccountnumber = prefix + accountNumber;
        let firstData = { AccountNumber: customerAccountnumber, verifiedUser: true, status: "approved" };
        let prevData = toUpdate
        registerUser.updateOne(prevData, firstData, { multi: true, new: true })
            .then((res) => {
                if (res.n) {
                    let response = {
                        msg: "Data Updated"
                    }
                    return resolve(response)
                } else {
                    let badResponse = {
                        msg: "No Such Email Exist",
                    }
                    return reject(badResponse)
                }
            })
            .catch((err) => {
                let badResponse = {
                    msg: "Data Not Updated",
                    error: err
                }
                return reject(badResponse)
            })
    })
}

exports.changeStatus = (toUpdate, data) => {
    return new Promise((resolve, reject) => {

        let firstData = { status: " not approved" };
        let prevData = toUpdate

        registerUser.updateOne(prevData, firstData, { multi: true, new: true })
            .then((res) => {
                if (res.n) {
                    let response = {
                        msg: "Data Updated"
                    }
                    return resolve(response)
                } else {
                    let badResponse = {
                        msg: "No Such Email Exist",
                    }
                    return reject(badResponse)
                }
            })
            .catch((err) => {
                let badResponse = {
                    msg: "Data Not Updated",
                    error: err
                }
                return reject(badResponse)
            })
    })
}




exports.changeStatusByAdmin = (toUpdate, data) => {
    return new Promise((resolve, reject) => {

        let firstData = { status: "approved" };
        let prevData = toUpdate

        registerUser.updateOne(prevData, firstData, { multi: true, new: true })
            .then((res) => {
                if (res.n) {
                    let response = {
                        msg: "Data Updated"
                    }
                    return resolve(response)
                } else {
                    let badResponse = {
                        msg: "No Such Email Exist",
                    }
                    return reject(badResponse)
                }
            })
            .catch((err) => {
                let badResponse = {
                    msg: "Data Not Updated",
                    error: err
                }
                return reject(badResponse)
            })
    })
}



///////----------------------------------


exports.removeData = (data) => {
    return new Promise((resolve, reject) => {
        registerUser.remove(data)
            .then((res) => {
                if (res.n) {
                    let response = {
                        msg: "Data Deleted"
                    }
                    return resolve(response)
                } else {
                    let badResponse = {
                        msg: "no such data exist"
                    }
                    return reject(badResponse)
                }
            })
            .catch((err) => {
                let badResponse = {
                    msg: "Data Not Deleted",
                    error: err
                }
                return reject(badResponse)
            })
    })
}












exports.findmini = (data) => {
    return new Promise((resolve, reject) => {
        registerUser.find(data)
            .then((res) => {
                return resolve(res.AccountNumber, res.balance);
            })
            .catch((err) => {
                let badResponse = {
                    message: "Data Not Found",
                    error: err
                }
                return reject(badResponse)
            })
    })
}





exports.update = async (findData, data) => {
    const resData = await registerUser.updateOne(findData, data);
    return resData;
}