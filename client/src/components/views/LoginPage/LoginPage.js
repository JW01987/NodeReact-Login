import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import Auth from "../../../hoc/auth";
import "../../../App.css";
function LoginPage() {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      email,
      password,
    };

    axios.post("/api/users/login", body).then((req) => {
      if (req.data.loginSucsses) {
        navigate("/");
      } else {
        alert("Error: " + req.data.message);
      }
    });
  };
  return (
    <div className="main_div">
      <form
        style={{ display: "flex", flexDirection: "column", fontSize: "2em" }}
      >
        <label style={{ paddingBottom: "0.5rem" }}>이메일</label>
        <input type="eamil" value={email} onChange={onEmailHandler} />

        <label style={{ marginTop: "0.5em", paddingBottom: "0.5rem" }}>
          비밀번호
        </label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <hr />
        <button
          className="btn"
          style={{ fontSize: "0.8em", margin: "auto", width: "100%" }}
          onClick={onSubmitHandler}
        >
          로그인
        </button>
        <div
          style={{
            marginTop: "0.8em",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <NavLink to="/register" className="spanLink">
            {" "}
            회원가입하기
          </NavLink>
          <NavLink to="/" className="spanLink">
            메인화면으로
          </NavLink>
        </div>
      </form>
    </div>
  );
}
//loginpage.js++++++
export default Auth(LoginPage, null); //LoginPage
