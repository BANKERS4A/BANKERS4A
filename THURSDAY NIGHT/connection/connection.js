const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/banking`, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
        console.log("Database Connected")
    })
    .catch((err) => {
        console.log("Database Not Connected", err)
    })

module.exports = mongoose;
