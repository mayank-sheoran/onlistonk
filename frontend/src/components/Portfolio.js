import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import "../css/Portfolio.css";
import "../css/Dashboard.css";
import "./Sidebar";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Popup from "./Popup";
import axios from "axios";
const Portfolio = (props) => {
  let history = useHistory();
  if (Cookies.get("user") == "" || Cookies.get("user") == undefined) {
    history.push("/login");
  }

  const [toogle, setToogle] = useState(true);
  const [section, setSection] = useState({
    reSection: false,
    stockSection: false,
    wlSection: true,
  });
  const [addRE, setAddRE] = useState(false);
  const [addingMsg, setAddingMsg] = useState(false);
  const [waitMsg, setWaitMsg] = useState(true);
  const [addWL, setAddWL] = useState(false);
  const [reINFO, setReINFO] = useState({
    name: "",
    description: "",
    url: "",
    emi: 0,
    rent: 0,
  });
  const [userRE, setUserRE] = useState([]);
  const [userWL, setUserWL] = useState([]);
  const [wlApiError, setWlApiError] = useState(false);
  const [query, setQuery] = useState("");
  const [srchRes, setSrchRes] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  useEffect(async () => {
    fetchREINFO();
    fetchWL();
  }, []);

  const onReSectionClick = () => {
    fetchREINFO();
    setSection({ reSection: true, stockSection: false, wlSection: false });
  };
  const onStockSectionClick = () => {
    setSection({ reSection: false, stockSection: true, wlSection: false });
  };
  const onWlSectionClick = () => {
    fetchWL();
    setSection({ reSection: false, stockSection: false, wlSection: true });
  };

  const onAddREClick = () => {
    setAddRE(!addRE);
  };

  const onAddWLClick = () => {
    setSearchActive(false);
    setAddWL(!addWL);
  };

  const onSrch = async (e) => {
    e.preventDefault();
    console.log(query);
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=6FRIUNORAQ1ROGWL`;
    const getRSLT = await axios.get(url);
    setSrchRes(getRSLT.data.bestMatches);
    setSearchActive(true);
    console.log(getRSLT.data.bestMatches);
  };

  const onReINFOSubmit = (e) => {
    e.preventDefault();
    setAddingMsg(true);
    console.log("before api call");
    axios
      .post("https://onlistonk.herokuapp.com/addREINFO", {
        name: reINFO.name,
        description: reINFO.description,
        url: reINFO.url,
        rent: reINFO.rent,
        emi: reINFO.emi,
        user: Cookies.get("user"),
      })
      .then((res) => {
        console.log("after api call");
        fetchREINFO();
      });
    console.log("submit end");
  };

  const fetchREINFO = () => {
    console.log("fetting info");
    axios
      .post("https://onlistonk.herokuapp.com/fetchREINFO", {
        user: Cookies.get("user"),
      })
      .then((result) => {
        console.log("fetchRE should be done", result.data);
        setUserRE(result.data);
        setAddingMsg(false);
        setAddRE(false);
      });
  };

  const fetchWL = async () => {
    const fetchWL = await axios.post(
      "https://onlistonk.herokuapp.com/fetchWL",
      {
        user: Cookies.get("user"),
      }
    );
    console.log(fetchWL.data);
    const temp = {};
    for (let i = 0; i < fetchWL.data.length; i++) {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${fetchWL.data[i].stock[0]}&outputsize=full&apikey=6FRIUNORAQ1ROGWL`;
      const getRSLT = await axios.get(url);
      if (getRSLT.data["Time Series (Daily)"] !== undefined) {
        setWlApiError(false);
        console.log(
          getRSLT.data["Time Series (Daily)"][
            Object.keys(getRSLT.data["Time Series (Daily)"])[0]
          ]
        );
        var price =
          getRSLT.data["Time Series (Daily)"][
            Object.keys(getRSLT.data["Time Series (Daily)"])[0]
          ];
        temp[fetchWL.data[i].stock[0]] = (
          ((parseFloat(price["4. close"]).toFixed(2) -
            parseFloat(price["1. open"]).toFixed(2)) /
            parseFloat(price["4. close"]).toFixed(2)) *
          100
        ).toFixed(2);
      } else {
        setWlApiError(true);
      }
    }
    console.log(temp);
    setUserWL(temp);
    setAddingMsg(false);
    setWaitMsg(false);
    setAddWL(false);
  };

  const addToWL = async (stock) => {
    setAddingMsg(true);
    const addingWL = await axios.post("https://onlistonk.herokuapp.com/addWL", {
      user: Cookies.get("user"),
      stock: stock,
    });
    fetchWL();
  };

  // const delFromWL = async () => {

  // }

  const handleFileInput = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setReINFO({ ...reINFO, url: reader.result });
    };
  };

  const ReHTML = userRE.map((re) => {
    return (
      <div className="single-re">
        <img src={re.imgPublicKey} />
        <h3>{re.name}</h3>
        <p>{re.description}</p>
        <div class="ui labeled button massive" tabindex="0">
          <div class={`ui button huge ${re.profitStatus ? "green" : "red"}`}>
            <i class="rupee sign icon large"></i> PNL
          </div>

          <a
            class={`ui basic left pointing label ${
              re.profitStatus ? "green" : "red"
            }`}>
            {re.PNL}
          </a>
        </div>
      </div>
    );
  });

  const srchResHTML = srchRes.map((res) => {
    console.log(res);
    return (
      <div className="srchRes-container">
        <div className="stock-title">
          <h3>{res["1. symbol"]}</h3>
        </div>
        <button
          onClick={() => addToWL(res["1. symbol"])}
          class="ui positive button">
          Add
        </button>
      </div>
    );
  });

  const WL_HTML = Object.keys(userWL).map((stock) => {
    return (
      <div style={{ display: "flex", marginTop: "2rem" }}>
        <div className="single-stock-container">
          <h3>{stock}</h3>
          <h2>{userWL[stock]}%</h2>
        </div>
        <button class="ui red button">Remove</button>
      </div>
    );
  });

  return (
    <div className="portfolio-container">
      <Header toogle={toogle} setToogle={setToogle} setLogin={props.setLogin} />
      <div className={`${toogle ? "sidebar-open" : "sidebar-close"}`}>
        <Sidebar section="portfolio" />
      </div>
      <div
        className={`${
          toogle ? "main-container-open" : "main-container-close"
        }`}>
        <div className="section-header">
          <div onClick={() => onWlSectionClick()} className="section-item">
            <div
              class={`fluid ui inverted button huge ${
                section.wlSection ? "yellow" : ""
              }`}>
              Watch-List
            </div>
          </div>
          <div onClick={() => onReSectionClick()} className="section-item">
            <div
              class={`fluid ui inverted button huge ${
                section.reSection ? "yellow" : ""
              }`}>
              Real Estate
            </div>
          </div>

          <div onClick={() => onStockSectionClick()} className="section-item">
            <div
              class={`fluid ui inverted button huge ${
                section.stockSection ? "yellow" : ""
              }`}>
              Holdings
            </div>
          </div>
        </div>
        {section.reSection && (
          <div className="re-main-container">
            <button onClick={onAddREClick} class="ui inverted button huge red">
              <i class="icon warehouse"></i>
              Add Property
            </button>
            <div className="re-container">
              {addRE && (
                <Popup close={setAddRE} title={"Add Property"}>
                  <div className="reform-container">
                    <form onSubmit={onReINFOSubmit} class="ui form">
                      <div class="field">
                        <label>Property Name</label>
                        <input
                          onChange={(e) =>
                            setReINFO({ ...reINFO, name: e.target.value })
                          }
                          type="text"
                          name="name"
                          placeholder="Name"
                          required
                        />
                      </div>
                      <div class="field">
                        <label>Property Description</label>
                        <textarea
                          onChange={(e) =>
                            setReINFO({
                              ...reINFO,
                              description: e.target.value,
                            })
                          }
                          required></textarea>
                      </div>
                      <div class="field">
                        <label>Add Image</label>
                        <input
                          onChange={(e) => handleFileInput(e.target.files[0])}
                          type="file"
                          required
                        />
                      </div>
                      <div class="field">
                        <label>Rent Amount /mo</label>
                        <input
                          onChange={(e) =>
                            setReINFO({ ...reINFO, rent: e.target.value })
                          }
                          type="number"
                          name="name"
                          placeholder="Amount INR"
                          required
                        />
                      </div>
                      <div class="field">
                        <label>Emi Amount /mo</label>
                        <input
                          onChange={(e) =>
                            setReINFO({ ...reINFO, emi: e.target.value })
                          }
                          type="number"
                          name="name"
                          placeholder="Amount INR"
                          required
                        />
                      </div>
                      <button class="ui button" type="submit">
                        Submit
                      </button>
                      {addingMsg && (
                        <h3 style={{ color: "green" }}>Adding Property ...</h3>
                      )}
                    </form>
                  </div>
                </Popup>
              )}
              {ReHTML}
            </div>
          </div>
        )}
        {section.stockSection && (
          <div className="stock-container">
            <div className="msg-container">
              <h3>
                APi's are <span style={{ color: "red" }}>PAID,</span> will add
                this section <span style={{ color: "yellow" }}>soon !</span>{" "}
              </h3>
            </div>
          </div>
        )}
        {section.wlSection && (
          <div className="main-wl-container">
            <button onClick={onAddWLClick} class="ui inverted button huge red">
              <i class="icon chart line"></i>
              Add Stocks
            </button>
            {addWL && (
              <Popup close={setAddWL} title={"Add BSE Stocks"}>
                <div className="wl-form">
                  <form onSubmit={(e) => onSrch(e)} class="ui form">
                    <div class="field">
                      <label>Stock</label>
                      <input
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        name="name"
                        placeholder="eg. NTPC, Reliance"
                      />
                    </div>
                    <button class="ui button" type="submit">
                      Search
                    </button>
                  </form>
                </div>
                <div className="main-srchRes-container">
                  {srchRes.length === 0 && searchActive && (
                    <div>NO RESULTS FOUND TRY AGAIN !</div>
                  )}
                  {searchActive && srchResHTML}
                  {addingMsg && (
                    <h3 style={{ color: "green" }}>
                      Adding Stock Please Wait .....{" "}
                    </h3>
                  )}
                </div>
              </Popup>
            )}
            <div className="wl-container">
              <h3 className="warning-msg">
                <i class="asterisk icon large"></i>
                Due to API Restrictions, Add Atmost 2 stocks{" "}
              </h3>
              {wlApiError && (
                <h3 className="warning-msg" style={{ fontSize: "40px" }}>
                  Failed to Fetch Watch-List due to API Restrictions, Try again
                  in 1 minute ...{" "}
                </h3>
              )}

              <div className="wl-heading">
                <h1 style={{ width: "60%" }}>Stocks</h1>
                <h1 style={{ width: "20%" }}>% Day Change</h1>
                <div className="empty-head-div"></div>
              </div>
              {waitMsg && (
                <h3
                  className="warning-msg"
                  style={{ color: "green", fontSize: "40px" }}>
                  Please Wait, While We Are Fetching Your Stocks
                </h3>
              )}
              {WL_HTML}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
