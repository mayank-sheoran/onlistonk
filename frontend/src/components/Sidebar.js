import React from "react";
import userImg from "../img/userimage.png";
import Cookies from "js-cookie";
import "../css/Sidebar.css";

const Sidebar = (props) => {
  return (
    <div className="sidebar-container">
      <hr
        style={{
          backgroundColor: "ivory",
          height: "1px",
          width: "100%",
          marginTop: "10px",
        }}
      />
      <div className="userinfo">
        {/* <img src={userImg} /> */}
        <i class="user icon large yellow"></i>
        <h3>{Cookies.get("user")}</h3>
      </div>
      <hr
        style={{
          backgroundColor: "ivory",
          height: "1px",
          width: "100%",
          marginTop: "10px",
        }}
      />
      <div className="navbar">
        <div
          className={`nav-items ${
            props.section === "news" ? "active-item" : ""
          }`}>
          <a
            href="/dashboard"
            className={`${props.section === "news" ? "active-link" : ""}`}>
            <i
              class={`newspaper inverted large icon ${
                props.section === "news" ? "yellow" : ""
              }`}></i>
            News
          </a>
        </div>
        <div
          className={`nav-items ${
            props.section === "portfolio" ? "active-item" : ""
          }`}>
          <a
            href="/portfolio"
            className={`${props.section === "portfolio" ? "active-link" : ""}`}>
            <i
              class={`chart pie inverted icon large ${
                props.section === "portfolio" ? "yellow" : ""
              }`}></i>
            Portfolio
          </a>
        </div>
        <div
          className={`nav-items ${
            props.section === "livechat" ? "active-item" : ""
          }`}>
          <a
            href="/livechat"
            className={`${props.section === "livechat" ? "active-link" : ""}`}>
            <i
              class={`users inverted large icon ${
                props.section === "livechat" ? "yellow" : ""
              }`}></i>
            Live Chat
          </a>
        </div>
        <div
          className={`nav-items ${
            props.section === "learning" ? "active-item" : ""
          }`}>
          <a
            href="/learning"
            className={`${props.section === "learning" ? "active-link" : ""}`}>
            <i
              class={`book inverted large icon ${
                props.section === "learning" ? "yellow" : ""
              }`}></i>
            Learning
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
