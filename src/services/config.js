import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2NCIsIkhldEhhblN0cmluZyI6IjAxLzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNTE0ODgwMDAwMCIsIm5iZiI6MTY5NTkyMDQwMCwiZXhwIjoxNzI1Mjk2NDAwfQ.36nQu-fyhBElKov0sWvrvwuO832nQWmfRIHcRVPB7Mw";
const baseURL = "https://movienew.cybersoft.edu.vn";
export const maNhom = "GP07";
export const https = axios.create({
  baseURL: baseURL,
  // timeout: 7000,
  headers: {
    TokenCybersoft: token,
    // Authorization: "Bearer " + token
  },
});
