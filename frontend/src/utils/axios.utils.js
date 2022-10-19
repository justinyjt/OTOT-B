import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API// || "https://polar-savannah-10068.herokuapp.com/",
});


