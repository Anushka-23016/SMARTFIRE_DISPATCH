import axios from "axios";

const API = axios.create({
  baseURL: "http://172.18.132.242:5000"
});

export default API;
