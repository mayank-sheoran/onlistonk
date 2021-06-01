const userLogin = require("../db/database");

exports.loginCheck = (req, res, next) => {
  // console.log(req.body)
  userLogin
    .findOne({
      username: req.body.username,
      password: req.body.password,
    })
    .then((result) => {
      if (result != null) {
        res.send({ exist: true });
      } else {
        res.send({ exist: false });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
