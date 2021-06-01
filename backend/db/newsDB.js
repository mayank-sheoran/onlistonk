const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const newsUpdate = new Schema({
    url : {
        type : String,
        required : true
    },
    img_url : {
        type : String,
        required : true
    },
    author : {
        type : String,
    },
    description : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    del : {
        type : String,
        required : true
    },
    userLikes : {
        type : Array,
        required : true
    }
});

module.exports = mongoose.model('newsUpdate',newsUpdate)


// 854dec1be497460b80a170e072244ae2