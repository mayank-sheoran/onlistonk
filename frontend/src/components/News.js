import React, { useState, useEffect } from "react";
import "../css/News.css";
import axios from "axios";
import Cookies from "js-cookie";

const News = () => {
  const [news, setNews] = useState([]);
  const [likePressed, setLikePressed] = useState(false);
  console.log(news);

  const getNews = async () => {
    const { data } = await axios.post("https://onlistonk.herokuapp.com/news");
    setNews(data);
  };

  useEffect(() => {
    getNews();
  }, []);

  console.log(news);
  const updateLike = async (id) => {
    setLikePressed(!likePressed);
    let likesAction = await axios.post(
      "https://onlistonk.herokuapp.com/news/likesAction",
      {
        userName: Cookies.get("user"),
        id: id,
      }
    );
    setNews(likesAction.data);
  };

  const checkAlreadyLiked = (id) => {
    let allData = news;
    for (let i = 0; i < allData.length; i++) {
      if (allData[i]._id === id) {
        for (let j = 0; j < allData[i].userLikes.length; j++) {
          if (allData[i].userLikes[j] === Cookies.get("user")) {
            return true;
          }
        }
        return false;
      }
    }
    return false;
  };

  const newsHTML = news.map((item) => {
    return (
      <div className="news-item">
        <div class="">
          <div className="title-img">
            <img src={item.img_url} />
            <div className="item-content">
              <a href={item.url} target="_blank">
                <h3>{item.title}</h3>
              </a>
              <div class="ui labeled button" tabindex="0">
                <button onClick={() => updateLike(item._id)}>
                  <div class="ui button">
                    <i
                      class={`heart icon ${
                        checkAlreadyLiked(item._id) ? "red" : ""
                      }`}></i>{" "}
                    Like
                  </div>
                </button>

                <a class="ui basic label">{item.userLikes.length}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <div className="news-container">{newsHTML}</div>;
};

export default News;
