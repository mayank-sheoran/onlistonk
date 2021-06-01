import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

const Login = (props) => {
  let history = useHistory();
  console.log("from login", Cookies.get("user"), props.isLogin);
  if (Cookies.get("user") !== undefined && Cookies.get("user") !== "") {
    props.setLogin(true);
    history.push("/dashboard");
  }

  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const [email, setEmail] = useState();
  const [regMsg, setRegMsg] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const [registerPress, setRegisterPress] = useState(false);
  const onLogin = () => {
    console.log(user, pass);
    const loginStatus = axios
      .post("https://onlistonk.herokuapp.com/login", {
        username: user,
        password: pass,
      })
      .then((res) => {
        if (res.data.exist === true) {
          setLoginMsg("");
          Cookies.set("user", user);
          props.setLogin(true);
          history.push("/dashboard");
        } else {
          setLoginMsg("User Does Not Exist !");
        }
      });
  };

  const onRegister = (event) => {
    event.preventDefault();
    if (registerPress === false) {
      console.log("register press");
      setUser("");
      setPass("");
      setRegisterPress(true);
    } else {
      console.log("registration success");
      if (user !== "" && pass !== "" && email !== "") {
        var userExist = false;
        const newUserLogin = axios
          .post("https://onlistonk.herokuapp.com/register/check-username", {
            username: user,
          })
          .then((res) => {
            console.log(res.data.exist);
            userExist = res.data.exist;
            if (userExist === false) {
              setRegMsg("Successfully Registerd !");
              const newUserLogin = axios
                .post("https://onlistonk.herokuapp.com/register", {
                  username: user,
                  password: pass,
                  email: email,
                })
                .then((res) => {
                  console.log("Data got from backend again", res.data);
                });
            } else {
              setRegMsg("User Already Exist !");
            }
          });
      } else {
        setRegMsg("Enter Valid Inputs !");
      }
    }
  };

  const onGoBack = () => {
    setRegisterPress(false);
    setRegMsg("");
  };

  return (
    <div className="Login">
      {registerPress ? (
        <div className="login-container">
          <h1>
            Onli <span>Stonk</span>
          </h1>
          <form onSubmit={onRegister}>
            <div className="login-field">
              <i class="huge user inverted icon"></i>
              <div className="ui huge inverted input">
                <input
                  onChange={(e) => setUser(e.target.value)}
                  type="text"
                  style={{ width: "350px" }}
                  placeholder="Username"
                  required
                />
              </div>
            </div>
            <div className="login-field">
              <i class="huge lock inverted icon"></i>
              <div className="ui huge inverted input">
                <input
                  onChange={(e) => setPass(e.target.value)}
                  type="password"
                  style={{ width: "350px" }}
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div className="login-field">
              <i class="huge address card inverted icon"></i>
              <div className="ui huge inverted input">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  style={{ width: "350px" }}
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="buttons">
              <div className="login-button">
                {/* <button onClick={onRegister} class="negative ui button">Register</button> */}
                <input
                  class="negative ui button"
                  type="submit"
                  value="Submit"
                />
              </div>
              <div className="login-button">
                <button onClick={onGoBack} class="positive ui button">
                  Go-Back
                </button>
              </div>
            </div>
          </form>
          <h3 className="regMsg">{regMsg}</h3>
        </div>
      ) : (
        <div className="login-container">
          {/* put logo here */}
          <h1>
            Onli <span>Stonk</span>
          </h1>
          <h3 className="loginMsg">{loginMsg}</h3>
          <div className="login-field">
            <i class="huge user inverted icon"></i>
            <div className="ui huge inverted input">
              <input
                onChange={(e) => setUser(e.target.value)}
                type="text"
                placeholder="Username"
              />
            </div>
          </div>
          <div className="login-field">
            <i class="huge lock inverted icon"></i>
            <div className="ui huge inverted input">
              <input
                onChange={(e) => setPass(e.target.value)}
                onKeyPress={(e) => (e.key === "Enter" ? onLogin() : null)}
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="buttons">
            <div className="login-button">
              <button onClick={onRegister} class="negative ui button">
                Register
              </button>
            </div>
            <div className="login-button">
              <button onClick={onLogin} class="positive ui button">
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
