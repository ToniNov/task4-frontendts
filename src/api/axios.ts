import axios from "axios";

const instance = axios.create({
  baseURL: "https://task4-backend.vercel.app/"
});

export default instance;
