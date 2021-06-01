const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const Books = new Schema({
    image_url : {
        type : String,
        require : true
    },
    name : {
        type : String,
        require : true
    },
    download_url : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model('Books',Books)