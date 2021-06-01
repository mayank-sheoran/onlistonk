const axios = require("axios");
const newsUpdate = require("../db/newsDB");
dataFetched = [];

module.exports = () => {
  const data = axios
    .get(
      "https://newsapi.org/v2/top-headlines?apiKey=854dec1be497460b80a170e072244ae2&country=in&category=business&pageSize=5"
    )
    .then((result) => {
      dataFetched = result;
      // console.log(dataFetched)
      newsUpdate.deleteMany({}).then((res) => {
        for (i = 0; i < dataFetched.data.articles.length; i++) {
          let url = dataFetched.data.articles[i].url;
          let img_url = dataFetched.data.articles[i].urlToImage;
          let author = dataFetched.data.articles[i].author;
          let description = dataFetched.data.articles[i].description;
          let title = dataFetched.data.articles[i].title;
          const news_update = new newsUpdate({
            url: url,
            img_url: img_url,
            author: author,
            description: description,
            title: title,
            del: "delete",
            userLikes: [],
          });
          news_update
            .save()
            .then()
            .catch((err) => console.log(err));
        }
      });
    })
    .catch((err) => console.log(err));
};
