const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Videos = new Schema({
    url : {
        type  : String,
        require : true
    }
})


module.exports = mongoose.model('Videos',Videos)