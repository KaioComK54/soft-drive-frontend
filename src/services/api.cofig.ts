import axios from "axios";
import { getAuthToken } from "utils/useAuth";

const instance = axios.create({
  baseURL: "https://sd-drive-backend.herokuapp.com",
  // baseURL: "http://localhost:4000",
  headers: { Authorization: `Bearer ${getAuthToken()}` },
});

export default instance;
