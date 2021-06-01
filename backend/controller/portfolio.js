const RE = require("../db/realestate");
const WL = require("../db/watchlist");
const axios = require("axios");
const { cloudinary } = require("./util/cloudinary");

exports.saveRE = async (req, res, next) => {
  const user = req.body.user;
  const name = req.body.name;
  const url = req.body.url;
  const description = req.body.description;
  const rent = req.body.rent;
  const emi = req.body.emi;
  const cloudResponse = await cloudinary.uploader.upload(url, {
    upload_preset: "onlistonk",
  });
  //   console.log(cloudResponse);
  const PNL = Number(req.body.rent) - Number(req.body.emi);
  const profitStatus =
    Number(req.body.rent) >= Number(req.body.emi) ? true : false;
  const R_E = new RE({
    name: name,
    profitStatus: profitStatus,
    description: description,
    PNL: PNL,
    user: user,
    imgPublicKey: cloudResponse.url,
  });
  R_E.save().then((result) => {
    console.log("REINFO SAVED");
    res.send();
  });
};

exports.fetchRE = (req, res, next) => {
  user = req.body.user;
  RE.find({ user: user }).then((result) => {
    if (result) {
      //   console.log(result);
      res.send(result);
    } else {
      res.send();
    }
  });
};

exports.fetchWL = (req, res, next) => {
  user = req.body.user;
  WL.find({ user: user }).then((result) => {
    if (result) {
      console.log(result);
      res.send(result);
    } else {
      res.send();
    }
  });
};

exports.addWL = (req, res, next) => {
  const user = req.body.user;
  const stock = req.body.stock;
  const W_L = new WL({
    user: user,
    stock: stock,
  });

  W_L.save().then((result) => {
    console.log("WL SAVED");
    res.send();
  });
};
