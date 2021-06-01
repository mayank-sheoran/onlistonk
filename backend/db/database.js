const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userLogin = new Schema({
    username : {
        required: true,
        type: String
    },
    password: {
        required : true,
        type : String
    },
    email : {
        required: true,
        type : String
    }
});

module.exports = mongoose.model('userLogin' , userLogin);