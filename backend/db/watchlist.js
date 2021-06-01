const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const WL = new Schema({
    user : {
        type : String, 
        require : true
    },
    stock : {
        type : Array , 
        require : true
    }
})

module.exports = mongoose.model('WL',WL)