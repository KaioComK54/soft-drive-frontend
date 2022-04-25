import axios from "./api.cofig";
import HttpError from "errors/httpError";

export interface DataTypeComplete {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type DataType = Omit<DataTypeComplete, "confirmPassword">;

const registerApi = async (data: DataType) =>
  await axios
    .post("/user", { ...data })
    .then((response: any) => response)
    .catch((error: any) => new HttpError(error.message, error.response.status));

export default registerApi;
