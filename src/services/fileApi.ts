import axios from "services/api.cofig";
import HttpError from "errors/httpError";

const getUserFiles = async () =>
  await axios
    .get("/file", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response: any) => response)
    .catch((error: any) => new HttpError(error.message, error.response.status));

const getAFile = async (id: string) => {
  return await axios
    .get(`/file/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      responseType: "blob",
    })
    .then((response: any) => {
      const file = new Blob([response.data], {
        type: "application/octet-stream",
      });

      const fileURL = URL.createObjectURL(file);
      const anchor = document.createElement("a");
      anchor.download = response.headers["filename"];
      anchor.href = fileURL;
      anchor.click();
      return response.data;
    })
    .catch((error: any) => new HttpError(error.message, error.response.status));
};

const sendUserFile = async (data: FormData) =>
  await axios
    .post("file/upload", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response: any) => response)
    .catch((error: any) => new HttpError(error.message, error.response.status));

const deleteAFile = async (id: string) => {
  return await axios
    .delete(`file/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response: any) => response)
    .catch((error: any) => new HttpError(error.message, error.response.status));
};

export { getUserFiles, getAFile, sendUserFile, deleteAFile };
