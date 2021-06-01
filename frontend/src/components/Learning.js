import React, { useState, useEffect } from "react";
import Cookies, { set } from "js-cookie";
import { useHistory } from "react-router-dom";
import "../css/Learning.css";
import "../css/Dashboard.css";
import "./Sidebar";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Popup from "./Popup";
import axios from "axios";

const Learning = (props) => {
  let history = useHistory();
  if (Cookies.get("user") == "" || Cookies.get("user") == undefined) {
    history.push("/login");
  }
  const [toogle, setToogle] = useState(true);
  const [showBook, setShowBook] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [addBook, setAddBook] = useState(false);
  const [addVideo, setAddVideo] = useState(false);
  const [bookUrl, setBookUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookDownUrl, setBookDownUrl] = useState("");
  const [books, setBooks] = useState([]);
  const [videos, setVideos] = useState([]);

  const getInitialBooks = async () => {
    const recieve_books = await axios.post(
      "https://onlistonk.herokuapp.com/getbooks"
    );
    setAddBook(false);
    setBooks(recieve_books.data);
  };

  const getInitialVideos = async () => {
    const recieve_videos = await axios.post(
      "https://onlistonk.herokuapp.com/getvideos"
    );
    console.log(recieve_videos);
    setAddVideo(false);
    const storeData = await saveVideos(recieve_videos.data);
  };

  useEffect(() => {
    getInitialBooks();
    getInitialVideos();
  }, []);

  const onBookClick = () => {
    setShowBook(true);
    setShowVideo(false);
  };

  const onVideosClick = () => {
    setShowBook(false);
    setShowVideo(true);
  };

  const onAddBook = () => {
    setAddBook(!addBook);
  };

  const onAddVideo = () => {
    setAddVideo(!addVideo);
  };

  const onBookAdded = async (event) => {
    event.preventDefault();
    console.log(bookUrl, bookName, bookDownUrl);
    const addingBook = await axios.post(
      "https://onlistonk.herokuapp.com/addbook",
      {
        name: bookName,
        download_url: bookDownUrl,
        image_url: bookUrl,
      }
    );
    const recieve_books = await axios.post(
      "https://onlistonk.herokuapp.com/getbooks"
    );
    console.log(recieve_books);
    setAddBook(false);
    setBooks(recieve_books.data);
  };

  const onVideoAdded = async (event) => {
    event.preventDefault();
    console.log(videoUrl);
    const addingVideo = await axios.post(
      "https://onlistonk.herokuapp.com/addvideo",
      {
        url: videoUrl,
      }
    );
    const recieve_videos = await axios.post(
      "https://onlistonk.herokuapp.com/getvideos"
    );
    console.log(recieve_videos, "working");
    setAddVideo(false);
    const storeData = await saveVideos(recieve_videos.data);
  };

  const bookHTML = books.map((book) => {
    return (
      <div className="book-container">
        <img src={book.image_url} />
        <div className="title">
          <p>{book.name}</p>
        </div>
        <div class="down-btn" style={{ width: "100px" }}>
          <a href={book.download_url} target="_blank">
            <button class="ui positive button huge">Download</button>
          </a>
        </div>
      </div>
    );
  });

  const saveVideos = async (videos) => {
    console.log("yos this is working", videos);
    let allVids = [];
    for (let i = 0; i < videos.length; i++) {
      const Y_url = videos[i].url;
      const apiUrl = `http://www.youtube.com/oembed?url=${Y_url}&format=json`;
      const Ydata = await axios.get(apiUrl);
      console.log(Ydata, "si");
      allVids.push([Ydata.data.title, Ydata.data.thumbnail_url, Y_url]);
    }
    console.log(allVids);
    setVideos(allVids);
    return 1;
  };

  const videoHTML = videos.map((video) => {
    console.log(video);
    return (
      <div className="video-container">
        <a href={video[2]} target="_blank">
          <div className="video-image">
            <img src={video[1]} />
          </div>
          <div className="video-title">
            <h3>{video[0]}</h3>
          </div>
        </a>
      </div>
    );
  });

  return (
    <div className="learning-container">
      <Header toogle={toogle} setToogle={setToogle} setLogin={props.setLogin} />
      <div className={`${toogle ? "sidebar-open" : "sidebar-close"}`}>
        <Sidebar section="learning" />
      </div>
      <div
        className={`${
          toogle ? "main-container-open" : "main-container-close"
        }`}>
        <div className="section-header">
          <div onClick={() => onBookClick()} className="section-item">
            <div
              class={`fluid ui inverted button huge ${
                showBook ? "yellow" : ""
              }`}>
              Books
            </div>
          </div>
          <div onClick={() => onVideosClick()} className="section-item">
            <div
              class={`fluid ui inverted button huge ${
                showVideo ? "yellow" : ""
              }`}>
              Videos
            </div>
          </div>
        </div>
        {showBook && (
          <div className="main-book-container">
            <div className="add-book">
              <button onClick={onAddBook} class="ui inverted button red huge">
                <i class="icon book"></i>
                Add Book
              </button>
              {addBook && (
                <Popup close={setAddBook} title={"Add Book"}>
                  <div className="add-book-popup">
                    <form onSubmit={onBookAdded} class="ui form">
                      <div class="field">
                        <label>Book Image URL</label>
                        <input
                          onChange={(e) => setBookUrl(e.target.value)}
                          type="text"
                          name="url"
                          placeholder="URL"
                          required
                        />
                      </div>
                      <div class="field">
                        <label>Book Name</label>
                        <input
                          onChange={(e) => setBookName(e.target.value)}
                          type="text"
                          name="name"
                          placeholder="Name"
                          required
                        />
                      </div>
                      <div class="field">
                        <label>Download Link</label>
                        <input
                          onChange={(e) => setBookDownUrl(e.target.value)}
                          type="text"
                          name="download-link"
                          placeholder="eg- drive link"
                          required
                        />
                      </div>
                      <button class="ui button" type="submit">
                        Submit
                      </button>
                    </form>
                  </div>
                </Popup>
              )}
            </div>
            <div className="books-container">{bookHTML}</div>
          </div>
        )}
        {showVideo && (
          <div className="main-video-container">
            <div className="add-book">
              <button onClick={onAddVideo} class="ui inverted button huge red">
                <i class="icon video"></i>
                Add Video
              </button>
              {addVideo && (
                <Popup close={setAddVideo} title={"Add Video"}>
                  <div className="add-book-popup">
                    <form onSubmit={onVideoAdded} class="ui form">
                      <div class="field">
                        <label>Youtube Video URL</label>
                        <input
                          onChange={(e) => setVideoUrl(e.target.value)}
                          type="text"
                          name="url"
                          placeholder="URL"
                          required
                        />
                      </div>
                      <button class="ui button" type="submit">
                        Submit
                      </button>
                    </form>
                  </div>
                </Popup>
              )}
            </div>
            <div className="videos-container">{videoHTML}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learning;
