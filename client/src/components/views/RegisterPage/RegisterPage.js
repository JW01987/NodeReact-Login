import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import Auth from "../../../hoc/auth";
import { autoBatchEnhancer } from "@reduxjs/toolkit";

function RegisterPage() {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    if (password !== confirmPassword) return alert("비밀번호를 다시 확인해라");
    if (
      email === "" ||
      name === "" ||
      password === "" ||
      confirmPassword === ""
    )
      return alert("똑디 입력해라");
    e.preventDefault();
    let body = {
      email,
      name,
      password,
    };

    axios.post("/api/users/register", body).then((req) => {
      console.log(req.data);
      if (req.data.sucsses) {
        navigate("/");
      } else {
        alert("Error");
      }
    });
  };
  return (
    <div className="main_div">
      <form>
        <div
          style={{
            fontSize: "1.6em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingRight: "1em",
              }}
            >
              <label className="label" for="eamil">
                이메일
              </label>
              <input id="eamil" value={email} onChange={onEmailHandler} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label className="label" for="name">
                이름
              </label>
              <input id="name" value={name} onChange={onNameHandler} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label className="label" for="password">
                비밀번호
              </label>
              <input
                id="password"
                value={password}
                onChange={onPasswordHandler}
                type="password"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label className="label" for="confirmPassword">
                비밀번호 확인
              </label>
              <input
                id="confirmPassword"
                value={confirmPassword}
                onChange={onConfirmPasswordHandler}
                type="password"
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{
              width: "80%",
              padding: "0.5em",
              marginTop: "1em",
            }}
            className="btn"
            onClick={onSubmitHandler}
          >
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default Auth(RegisterPage, null);
