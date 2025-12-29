import axios from "axios";

const SERVER_URL = "https://opentdb.com";

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
});
