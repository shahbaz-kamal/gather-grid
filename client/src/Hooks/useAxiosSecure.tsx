import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  // baseURL: "https://gather-grid-server.vercel.app/",
  withCredentials: true, //
});

const useAxiosSecure = () => {
  return axiosInstance;
};

export default useAxiosSecure;
