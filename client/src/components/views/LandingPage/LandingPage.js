import React from "react";
import axios from "axios";
import { useEffect } from "react";
function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then((res) => console.log(res));
  }, []);
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
      LandingPage
    </div>
  );
}

export default LandingPage;