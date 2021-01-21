import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:44372/",
});

instance.interceptors.request.use((config) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
    config.headers["Authorization"] = "Bearer " + user.token;
  }
  return config;
});

export default instance;
