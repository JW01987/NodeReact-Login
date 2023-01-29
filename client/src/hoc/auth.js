import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//childComponent => 감싼 컴포넌트
//option =>  null = 누구나 입장
//                true = 로그인한 사람만 입장
//                false = 로그인 안 한 사람만 입장
//admin => 어드민만 입장
const Auth = (ChildComponent, option, adminRoute = null) => {
  const navigate = useNavigate();
  function AuthCheck(props) {
    useEffect(() => {
      axios.get("/api/users/auth").then((res) => {
        if (!res.data.isAuth) {
          //로그인하지 않음
          if (option) {
            //로그인 안 했는데 로그인 한 사람 전용 페이지에 들어가려할 때
            return navigate("/login");
          } else {
            //로그인 함
            if (adminRoute && !res.data.isAdmin) {
              //로그인하고 어드민 페이지 접속, 그런데 어드민 계정이 아닐경우
              return navigate("/");
            } else {
              if (option === false) {
                //로그인하고 로그인 안한사람용 페이지에 들어가려할때
                return navigate("/");
              }
            }
          }
        }
      });
    }, []);
    return <ChildComponent {...props} />;
  }
  return AuthCheck;
};
export default Auth;
