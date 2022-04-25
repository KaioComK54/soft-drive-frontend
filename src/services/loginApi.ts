import axios from "./api.cofig";
import AuthError from "errors/authError";

export interface DataType {
  email: string;
  password: string;
}

const loginApi = async (data: DataType) =>
  await axios
    .post("/auth/signin", { ...data })
    .then((response: any) => response)
    .catch((error: any) => new AuthError(error.message));

export default loginApi;
