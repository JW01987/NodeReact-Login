import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifycontent: "center",
        alignitems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />{" "}
        {/*Auth(LoginPage,false) */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
