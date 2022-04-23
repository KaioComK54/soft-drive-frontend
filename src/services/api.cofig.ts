import axios from "axios";
import { getAuthToken } from "utils/useAuth";

const instance = axios.create({
  baseURL: "http://soft-drive-backend.herokuapp.com",
  headers: { Authorization: `Bearer ${getAuthToken()}` },
});

export default instance;
