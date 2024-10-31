import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const origin =
  process.env.NEXT_LOCALHOST_URL || "https://webspacefrontend.vercel.app";
const myAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    // Menambahkan header Origin secara default
    Origin: origin,
  },
  withCredentials: true, // Menambahkan opsi withCredentials
});

export default myAxios;
