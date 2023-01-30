import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";
import "../../../App.css";
function LandingPage() {
  const navigate = useNavigate();
  let [login, setlogin] = useState(false);
  useEffect(() => {
    axios.get("/api/users/auth").then((res) => {
      if (res.data.isAuth) {
        return setlogin(true);
      }
    });
  }, []);
  let onClickHandlerFalse = () => {
    axios.get("/api/users/logout").then((res) => {
      if (res.data.sucsses) {
        alert("로그아웃 완료");
        navigate("/");
        setlogin(false);
      } else alert("로그아웃 오류");
    });
  };
  let onClickHandlerTrue = () => {
    return navigate("/login");
  };
  return (
    <div className="main_div">
      <h4 className="landingH4">
        {" "}
        <span>내가</span> 열심히 만든
      </h4>
      <h2 className="landingH2">
        <span>맛있는</span> 로그인 페이지
      </h2>
      <button
        className="btn"
        onClick={login ? onClickHandlerFalse : onClickHandlerTrue}
      >
        {login ? "로그아웃" : "로그인"}
      </button>
    </div>
  );
}

export default Auth(LandingPage, null);
