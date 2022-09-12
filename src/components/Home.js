import userEvent from "@testing-library/user-event";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Home.css";

import Nav from "./Nav";
import Posts from "./Posts";
import UserInfo from "./UserInfo";

function Home(props) {
  return (
    <div>
      <Nav></Nav>
      <div className="profile-main">
        <UserInfo userId={"631fa6808a10a49fa166736e"}></UserInfo>
        <Posts></Posts>
      </div>
    </div>
  );
}

export default Home;
