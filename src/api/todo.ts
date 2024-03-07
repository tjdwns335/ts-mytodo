import axios from "axios";

const SERVER_URI: string = "http://localhost:4000";

export const jsonApi = axios.create({
  baseURL: `${SERVER_URI}`,
  headers: {
    "Content-Type": "application/json",
  },
});
