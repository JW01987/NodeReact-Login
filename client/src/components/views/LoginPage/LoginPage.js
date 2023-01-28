import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <label>Email</label>
        <input type="eamil" value={email} onChange={onEmailHandler} />

        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <hr />
        <button onClick={onSubmitHandler}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
