import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import githubLogo from "../images/icons8-github.svg";
import emailLogo from "../images/icons8-circled-envelope-50.png";

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wrongLogin, setWrongLogin] = useState(false);
  const [user, setUser] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://127.0.0.1:3000/login",
      data: {
        email,
        password,
      },
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response.data);
        if (response.data == "Incorrect username or password.") {
          setWrongLogin(true);
          console.log("Incorrect username or password.");
        } else {
          setUser(response.data);

          setWrongLogin(false);
        }
        //window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // useEffect(() => {
  //   localStorage.setItem("currentUser", user.username);

  // }, [user]);
  return (
    <div className="login-page">
      <div className="login-main">
        <div className="login-page-intro">
          <h1>reactbook</h1>
          <p>Connect with friends and the world around you with reactbook.</p>
        </div>
        <div className="login">
          {wrongLogin ? <p>"Incorrect username or password."</p> : ""}
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="login-button">Log In</button>
          </form>
          <button className="login-button">
            <a href="/home">Demo Account</a>{" "}
          </button>
          <hr />
          <button className="signup-button">
            <a href="/signup">Sign Up</a>{" "}
          </button>
        </div>
      </div>
      <div class="footer">
        <div>
          <a href="https://github.com/lkong01">
            <img src={githubLogo} alt="github-icon" />
          </a>
          <a href="mailto:lingweikong10@gmail.com">
            <img src={emailLogo} alt="email-icon" />
          </a>
        </div>
        <p>Lingwei Kong @ 2022</p>
      </div>
    </div>
  );
}

export default Login;
