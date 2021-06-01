const Books = require('../db/books')
const Videos = require('../db/videos')

exports.postAddBook = (req,res,next) => {
    const name = req.body.name
    const download_url = req.body.download_url
    const image_url = req.body.image_url
    const books = new Books({
        name : name,
        download_url : download_url,
        image_url : image_url
    })
    books.save().then((result)=>{
        console.log('book added successfully')
        res.send()
    }).catch((err)=> console.log(err))

}

exports.postRetrieveBooks = (req,res,next) => {
    Books.find().then((result)=>{
        res.send(result)
        console.log(result)
    }).catch((err)=>console.log(err))
}


exports.postAddVideo = (req,res,next) => {
    url = req.body.url
    const video = new Videos({
        url : url
    })
    video.save().then((result)=>{
        console.log('video added successfully')
        res.send()
    }).catch((err)=> console.log(err))
}


exports.postRetrieveVideos = (req,res,next) => {
    Videos.find().then((result)=>{
        res.send(result)
    }).catch((err)=>console.log(err))
}