import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import "../css/Dashboard.css";
import "./Sidebar";
import Sidebar from "./Sidebar";
import Header from "./Header";
import News from "./News";

const Dashboard = (props) => {
  let history = useHistory();
  const [toogle, setToogle] = useState(true);
  console.log("from dashboard", props.isLogin, Cookies.get("user"));
  if (
    props.isLogin === false ||
    Cookies.get("user") == "" ||
    Cookies.get("user") == undefined
  ) {
    history.push("/login");
  }
  props.setLogin(true);
  return (
    <div>
      <div className="dashboard-container">
        <Header
          toogle={toogle}
          setToogle={setToogle}
          setLogin={props.setLogin}
        />
        <div className={`${toogle ? "sidebar-open" : "sidebar-close"}`}>
          <Sidebar section="news" />
        </div>
        <div
          className={`${
            toogle ? "main-container-open" : "main-container-close"
          }`}>
          <News />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
