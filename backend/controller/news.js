const newsUpdate = require("../db/newsDB");

const search = (userName, users) => {
  newArray = [];
  let flag = 0;
  for (var i = 0; i < users.length; i++) {
    if (users[i] === userName) {
      flag = 1;
      continue;
    } else {
      newArray.push(users[i]);
    }
  }
  if (flag === 0) {
    newArray.push(userName);
  }
  return newArray;
};

exports.updateLikes = (req, res, next) => {
  newsUpdate.findOne({ _id: req.body.id }).then((result) => {
    // console.log(result,'ffffffffffffffffffff',req.body.id)
    newsUpdate
      .findOneAndUpdate(
        { _id: req.body.id },
        {
          userLikes: search(req.body.userName, result.userLikes),
        }
      )
      .then((result) => {
        newsUpdate.find().then((results) => {
          res.send(results);
        });
      });
  });
};

exports.postNews = (req, res, next) => {
  newsUpdate.find().then((result) => {
    res.send(result);
  });
};
