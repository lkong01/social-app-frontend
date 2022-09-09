import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wrongLogin, setWrongLogin] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://127.0.0.1:3000/login",
      data: {
        username,
        password,
      },
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response);
        if (response.data == "Incorrect username or password.") {
          setWrongLogin(true);
        } else {
          setWrongLogin(false);
        }
        //window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    // setCredentialError('Credential Error (Your custom message)')
    // }).then((res) => {
    //   if (res.data.isAuthenticated) {
    //     setIsAuthenticated(true);
    //     console.log(res.data.isAuthenticated);

    //     // navigate("/home");
    //   } else {
    //     //navigate("/");
    //   }
    // });
  }

  return (
    <div>
      <p>{wrongLogin ? "Incorrect username or password." : ""}</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Log In</button>
      </form>
      <button>
        <a href="/home">Demo Account</a>{" "}
      </button>
      <button>
        <a href="/signup">Sign Up</a>{" "}
      </button>
      {/* <button
        onClick={() =>
          axios.get(process.env.REACT_APP_api + "/logout").then((res) => {
            console.log(res.data);
          })
        }
      >
        logout
      </button> */}
    </div>
  );
}

export default Login;
