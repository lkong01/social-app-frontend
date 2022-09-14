import userEvent from "@testing-library/user-event";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Home.css";

import Nav from "./Nav";
import Posts from "./Posts";
import UserInfo from "./UserInfo";

function Home(props) {
  // const [user, setUser] = useState({});

  // useEffect(() => {
  //   console.log(JSON.parse(localStorage.getItem("user"))._id);
  // }, []);

  return (
    <div className="home">
      <Nav></Nav>

      <div className="profile-main">
        <UserInfo
          userId={JSON.parse(localStorage.getItem("user"))._id}
        ></UserInfo>
        <Posts></Posts>
      </div>
    </div>
  );
}

export default Home;
