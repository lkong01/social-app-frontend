import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Layout(props) {
  return (
    <div>
      <h1>Welcome to the app!</h1>
      <nav>
        <Link to="/login">login</Link> |<Link to="/home">Home</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
