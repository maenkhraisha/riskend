import axios from "axios";

let BASE_URL = "";
// const BASE_URL = "http://localhost:3500";

if (process.env.NODE_ENV === "development") {
    BASE_URL = "http://localhost:3500";
} else if (process.env.NODE_ENV === "production") {
    BASE_URL = "https://riskend.onrender.com:3500";
}

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
