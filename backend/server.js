const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const newsRoutes = require("./routes/news");
const fetchNews = require("./api/fetchNews");
const learningRoutes = require("./routes/learning");
const portfolioRoutes = require("./routes/portfolio");

app.use(loginRoutes);
app.use(registerRoutes);
app.use(newsRoutes);
app.use(learningRoutes);
app.use(portfolioRoutes);

mongoose
  .connect(
    "mongodb+srv://server_RW:UlO5KbVcl4RJeuqy@cluster0.sbpdf.mongodb.net/userLogin?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  )
  .then((result) => {
    app.listen(process.env.PORT || 3001);
    fetchNews();
    setInterval(fetchNews, 43200000);
  })
  .catch((err) => {
    console.log(err);
  });
