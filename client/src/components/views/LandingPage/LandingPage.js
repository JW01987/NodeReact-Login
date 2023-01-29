import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";
function LandingPage() {
  const navigate = useNavigate();
  let onClickHandler = () => {
    axios.get("/api/users/logout").then((req) => {
      if (req.data.sucsses) {
        return navigate("/login");
      } else return alert("로그아웃 오류");
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작페이지</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default Auth(LandingPage, null);
