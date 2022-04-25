import axios from "./api.cofig";
import HttpError from "errors/httpError";

export interface DataType {
  email: string;
  password: string;
}

const loginApi = async (data: DataType) =>
  await axios
    .post("/auth/signin", { ...data })
    .then((response: any) => response)
    .catch((error: any) => new HttpError(error.message, error.response.status));

export default loginApi;
