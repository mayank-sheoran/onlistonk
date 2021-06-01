const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const RE = new Schema({
    user : {
        type : String, 
        require : true
    },
    imgPublicKey : {
        type : String,
        require : true
    },
    name : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    PNL : {
        type : Number,
        require : true
    },
    profitStatus : {
        type : Boolean,
        require : true
    }
})

module.exports = mongoose.model('RE',RE)