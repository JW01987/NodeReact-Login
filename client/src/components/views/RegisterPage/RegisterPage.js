import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label>이메일</label>
        <input type="eamil" value={email} onChange={onEmailHandler} />

        <label>이름</label>
        <input type="text" value={name} onChange={onNameHandler} />

        <label>비밀번호</label>
        <input type="text" value={password} onChange={onPasswordHandler} />

        <label>비밀번호 확인</label>
        <input
          type="text"
          value={confirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <hr />
        <button onClick={onSubmitHandler}>Login</button>
      </form>
    </div>
  );
}

export default Auth(RegisterPage, false);
