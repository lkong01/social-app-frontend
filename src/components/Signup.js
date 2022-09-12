import React, { useState, useEffect } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImg, setProfileImg] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("profileImg", profileImg);

    axios({
      method: "post",
      url: "http://127.0.0.1:3000/signup",
      data: formData,
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="login-page">
      <div className="login-main">
        <div className="login">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            {/* <input
              type="file"
              onChange={(e) => {
                setProfileImg(e.target.files[0]);
              }}
            /> */}
            <input
              type="file"
              id="avatar-input"
              onChange={(e) => {
                setProfileImg(e.target.files[0]);
              }}
            />
            <label htmlFor="avatar-input">Add a picture</label>
            <button className="login-button">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
