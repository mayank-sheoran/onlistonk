const express = require("express");
const userLogin = require("../db/database");

exports.postCheckUsername = (req, res, next) => {
  // console.log(req.body)
  userLogin
    .findOne({ username: req.body.username })
    .then((result) => {
      if (result !== null) {
        res.send({ exist: true });
      } else {
        res.send({ exist: false });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postRegister = (req, res, next) => {
  // console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const user_login = new userLogin({
    username: username,
    password: password,
    email: email,
  });
  user_login
    .save()
    .then()
    .catch((err) => console.log(err));
  res.send();
};
