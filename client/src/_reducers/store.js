import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let user = createSlice({
  name: "userLogin",
  initialState: {},
  reducers: {
    async userLogin(state, body) {
      return await axios
        .post("/api/users/login", body.payload)
        .then((req) => req.data);
    },
  },
});

export let { userLogin } = user.actions;

export const store = configureStore({
  reducer: {
    user: user.reducer,
  },
});
